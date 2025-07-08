/*
  # Add Payment System Tables and Fields

  1. New Tables
    - `payments` - Stores payment transactions
    - `subscriptions` - Tracks user subscription status

  2. Changes
    - Add subscription fields to `users` table

  3. Security
    - Enable RLS on new tables
    - Add policies for secure access
*/

-- Add subscription fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired', 'cancelled'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_end_at TIMESTAMPTZ;

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('trial', 'monthly', 'annual')),
  payment_method TEXT DEFAULT 'mpesa',
  amount INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  transaction_id TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create subscriptions table for better tracking
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('trial', 'active', 'expired', 'cancelled')),
  plan_type TEXT NOT NULL CHECK (plan_type IN ('trial', 'monthly', 'annual')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for payments table
CREATE POLICY "Users can view their own payments"
  ON payments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all payments"
  ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert payments"
  ON payments
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for subscriptions table
CREATE POLICY "Users can view their own subscription"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all subscriptions"
  ON subscriptions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can manage subscriptions"
  ON subscriptions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to update user subscription status
CREATE OR REPLACE FUNCTION update_user_subscription_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the user's subscription status and end date
  UPDATE users
  SET 
    subscription_status = NEW.status,
    subscription_end_at = NEW.end_date
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update user subscription status
CREATE TRIGGER on_subscription_update
  AFTER INSERT OR UPDATE ON subscriptions
  FOR EACH ROW EXECUTE PROCEDURE update_user_subscription_status();

-- Create function to handle new user creation and set trial period
CREATE OR REPLACE FUNCTION handle_new_user_trial()
RETURNS TRIGGER AS $$
DECLARE
  trial_end_date TIMESTAMPTZ;
BEGIN
  -- Set trial start date to now
  UPDATE users
  SET 
    trial_started_at = now(),
    subscription_status = 'trial',
    subscription_end_at = now() + interval '7 days'
  WHERE id = NEW.id;
  
  -- Calculate trial end date (7 days from now)
  trial_end_date := now() + interval '7 days';
  
  -- Insert into subscriptions table
  INSERT INTO subscriptions (
    user_id,
    status,
    plan_type,
    start_date,
    end_date
  ) VALUES (
    NEW.id,
    'trial',
    'trial',
    now(),
    trial_end_date
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user trial
CREATE TRIGGER on_new_user_created
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user_trial();