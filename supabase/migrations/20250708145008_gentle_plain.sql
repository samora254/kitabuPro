/*
  # Calendar-Based Billing System

  1. New Fields
    - Added billing_cycle field to subscriptions table
    - Added next_due_date field to subscriptions table
    - Added last_payment_date field to subscriptions table
    - Added prorated_amount field to payments table

  2. Changes
    - Modified subscription handling to support calendar-based billing
    - Added functions to calculate prorated amounts
    - Added triggers to update subscription status on expiry
*/

-- Add new fields to subscriptions table
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'annual'));
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS next_due_date TIMESTAMPTZ;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMPTZ;

-- Add prorated_amount field to payments table
ALTER TABLE payments ADD COLUMN IF NOT EXISTS prorated_amount BOOLEAN DEFAULT FALSE;

-- Create function to calculate next due date based on billing cycle
CREATE OR REPLACE FUNCTION calculate_next_due_date(billing_cycle TEXT)
RETURNS TIMESTAMPTZ AS $$
DECLARE
  next_date TIMESTAMPTZ;
BEGIN
  IF billing_cycle = 'monthly' THEN
    -- For monthly, next due date is the 1st of next month
    next_date := date_trunc('month', now()) + interval '1 month';
  ELSE
    -- For annual, next due date is January 1st of next year
    IF date_part('month', now()) = 12 THEN
      next_date := date_trunc('year', now()) + interval '1 year';
    ELSE
      next_date := date_trunc('year', now()) + interval '1 year';
    END IF;
  END IF;
  
  RETURN next_date;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate prorated amount
CREATE OR REPLACE FUNCTION calculate_prorated_amount(plan_type TEXT, full_amount INTEGER)
RETURNS INTEGER AS $$
DECLARE
  days_in_month INTEGER;
  days_remaining INTEGER;
  prorated_amount INTEGER;
BEGIN
  -- Calculate days in current month
  days_in_month := extract(day from (date_trunc('month', now()) + interval '1 month' - interval '1 day'));
  
  -- Calculate days remaining in current month
  days_remaining := days_in_month - extract(day from now()) + 1;
  
  -- Calculate prorated amount
  IF plan_type = 'monthly' THEN
    prorated_amount := (full_amount * days_remaining) / days_in_month;
  ELSE
    -- For annual, prorate based on days remaining in the year
    days_in_month := 365;
    days_remaining := extract(day from (date_trunc('year', now()) + interval '1 year' - now()));
    prorated_amount := (full_amount * days_remaining) / days_in_month;
  END IF;
  
  -- Round to nearest integer
  RETURN round(prorated_amount);
END;
$$ LANGUAGE plpgsql;

-- Create function to handle subscription expiry
CREATE OR REPLACE FUNCTION handle_subscription_expiry()
RETURNS TRIGGER AS $$
BEGIN
  -- If subscription has expired, update status
  IF NEW.end_date < now() AND NEW.status = 'active' THEN
    NEW.status := 'expired';
    
    -- Update user subscription status
    UPDATE users
    SET subscription_status = 'expired'
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for subscription expiry
CREATE TRIGGER on_subscription_update_check_expiry
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE PROCEDURE handle_subscription_expiry();

-- Create function to check for expired subscriptions (to be run by cron job)
CREATE OR REPLACE FUNCTION check_expired_subscriptions()
RETURNS void AS $$
BEGIN
  -- Update subscriptions that have expired
  UPDATE subscriptions
  SET status = 'expired'
  WHERE end_date < now() AND status = 'active';
  
  -- Update users with expired subscriptions
  UPDATE users
  SET subscription_status = 'expired'
  WHERE id IN (
    SELECT user_id FROM subscriptions
    WHERE status = 'expired'
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to handle subscription renewal
CREATE OR REPLACE FUNCTION handle_subscription_renewal()
RETURNS TRIGGER AS $$
BEGIN
  -- If payment is successful and it's for a subscription
  IF NEW.status = 'success' AND NEW.plan_type IN ('monthly', 'annual') THEN
    -- Update subscription with new dates
    UPDATE subscriptions
    SET 
      status = 'active',
      last_payment_date = now(),
      start_date = CASE 
        WHEN status = 'expired' THEN now()
        ELSE start_date
      END,
      end_date = NEW.end_date,
      next_due_date = calculate_next_due_date(NEW.plan_type),
      billing_cycle = NEW.plan_type,
      updated_at = now()
    WHERE user_id = NEW.user_id;
    
    -- Update user subscription status
    UPDATE users
    SET 
      subscription_status = 'active',
      subscription_end_at = NEW.end_date
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for subscription renewal
CREATE TRIGGER on_payment_success_renew_subscription
  AFTER UPDATE OF status ON payments
  FOR EACH ROW
  WHEN (NEW.status = 'success')
  EXECUTE PROCEDURE handle_subscription_renewal();