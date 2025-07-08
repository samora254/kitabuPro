/*
  # Initial Schema Setup
  
  1. New Tables
    - `users` - Stores user profiles with role-based access
    - `homework_assignments` - Stores assignments created by teachers
    - `homework_submissions` - Stores student submissions for assignments
    - `agents` - Stores sales agent profiles and performance metrics
    - `teacher_profiles` - Stores teacher-specific information
    - `dashboard_content` - Stores dynamic dashboard content by role
  
  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Set up authentication hooks
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'agent', 'admin')),
  grade TEXT,
  age INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create homework_assignments table
CREATE TABLE IF NOT EXISTS homework_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  instructions TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create homework_submissions table
CREATE TABLE IF NOT EXISTS homework_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES homework_assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  performance_metrics JSONB DEFAULT '{}'::JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create teacher_profiles table
CREATE TABLE IF NOT EXISTS teacher_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subjects TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  classes TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create dashboard_content table
CREATE TABLE IF NOT EXISTS dashboard_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'agent', 'admin')),
  content_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_content ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all user profiles"
  ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can create user profiles"
  ON users
  FOR INSERT
  WITH CHECK (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin can update any user profile"
  ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for homework_assignments table
CREATE POLICY "Teachers can create assignments"
  ON homework_assignments
  FOR INSERT
  WITH CHECK (
    teacher_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'teacher'
    )
  );

CREATE POLICY "Teachers can view their own assignments"
  ON homework_assignments
  FOR SELECT
  USING (
    teacher_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Students can view assignments for their grade"
  ON homework_assignments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'student' 
      AND grade = homework_assignments.grade
    )
  );

CREATE POLICY "Teachers can update their own assignments"
  ON homework_assignments
  FOR UPDATE
  USING (teacher_id = auth.uid())
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Admin can update any assignment"
  ON homework_assignments
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for homework_submissions table
CREATE POLICY "Students can submit homework"
  ON homework_submissions
  FOR INSERT
  WITH CHECK (
    student_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'student'
    )
  );

CREATE POLICY "Students can view their own submissions"
  ON homework_submissions
  FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Teachers can view submissions for their assignments"
  ON homework_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM homework_assignments
      WHERE homework_assignments.id = homework_submissions.assignment_id
      AND homework_assignments.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all submissions"
  ON homework_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for agents table
CREATE POLICY "Agents can view their own profile"
  ON agents
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all agent profiles"
  ON agents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can update agent profiles"
  ON agents
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for teacher_profiles table
CREATE POLICY "Teachers can view their own profile"
  ON teacher_profiles
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all teacher profiles"
  ON teacher_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can update their own profile"
  ON teacher_profiles
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can update any teacher profile"
  ON teacher_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for dashboard_content table
CREATE POLICY "Users can view dashboard content for their role"
  ON dashboard_content
  FOR SELECT
  USING (
    role = (SELECT role FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Admin can manage all dashboard content"
  ON dashboard_content
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, created_at)
  VALUES (new.id, coalesce(new.raw_user_meta_data->>'name', ''), new.email, coalesce(new.raw_user_meta_data->>'role', 'student'), now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to handle user role updates
CREATE OR REPLACE FUNCTION public.handle_user_role_update()
RETURNS TRIGGER AS $$
BEGIN
  -- If role changed to teacher, create teacher profile if it doesn't exist
  IF NEW.role = 'teacher' AND OLD.role != 'teacher' THEN
    INSERT INTO public.teacher_profiles (user_id, subjects, classes)
    VALUES (NEW.id, '{}'::TEXT[], '{}'::TEXT[])
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  
  -- If role changed to agent, create agent profile if it doesn't exist
  IF NEW.role = 'agent' AND OLD.role != 'agent' THEN
    INSERT INTO public.agents (user_id, performance_metrics)
    VALUES (NEW.id, '{}'::JSONB)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user role updates
CREATE TRIGGER on_user_role_updated
  AFTER UPDATE OF role ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_role_update();