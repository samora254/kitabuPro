import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Initialize Supabase client
const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Types for database tables
export type Tables = {
  users: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'agent' | 'admin';
    grade?: string;
    age?: number;
    created_at: string;
  };
  homework_assignments: {
    id: string;
    title: string;
    subject: string;
    grade: string;
    teacher_id: string;
    instructions: string;
    created_at: string;
  };
  homework_submissions: {
    id: string;
    assignment_id: string;
    student_id: string;
    answers: any;
    submitted_at: string;
  };
  agents: {
    id: string;
    user_id: string;
    performance_metrics: any;
    created_at: string;
  };
  teacher_profiles: {
    id: string;
    user_id: string;
    subjects: string[];
    classes: string[];
    created_at: string;
  };
  dashboard_content: {
    id: string;
    role: 'student' | 'teacher' | 'agent' | 'admin';
    content_type: string;
    data: any;
    created_at: string;
  };
};

// Helper functions for auth
export const signUp = async (email: string, password: string, userData: Partial<Tables['users']>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  
  if (error) throw error;
  
  // If signup is successful, create a record in the users table
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        name: userData.name || '',
        role: userData.role || 'student',
        grade: userData.grade,
        age: userData.age,
      });
    
    if (profileError) throw profileError;
    
    // If the user is a teacher, create a teacher profile
    if (userData.role === 'teacher') {
      const { error: teacherError } = await supabase
        .from('teacher_profiles')
        .insert({
          user_id: data.user.id,
          subjects: [],
          classes: [],
        });
      
      if (teacherError) throw teacherError;
    }
    
    // If the user is an agent, create an agent profile
    if (userData.role === 'agent') {
      const { error: agentError } = await supabase
        .from('agents')
        .insert({
          user_id: data.user.id,
          performance_metrics: {},
        });
      
      if (agentError) throw agentError;
    }
  }
  
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Get the user's profile from the users table
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserRole = async (): Promise<'student' | 'teacher' | 'agent' | 'admin' | null> => {
  const user = await getCurrentUser();
  return user?.role || null;
};

// Helper functions for homework assignments
export const createHomeworkAssignment = async (assignment: Omit<Tables['homework_assignments'], 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('homework_assignments')
    .insert({
      ...assignment,
      created_at: new Date().toISOString(),
    })
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getHomeworkAssignments = async (teacherId?: string, grade?: string) => {
  let query = supabase
    .from('homework_assignments')
    .select('*');
  
  if (teacherId) {
    query = query.eq('teacher_id', teacherId);
  }
  
  if (grade) {
    query = query.eq('grade', grade);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getHomeworkAssignment = async (id: string) => {
  const { data, error } = await supabase
    .from('homework_assignments')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Helper functions for homework submissions
export const submitHomework = async (submission: Omit<Tables['homework_submissions'], 'id' | 'submitted_at'>) => {
  const { data, error } = await supabase
    .from('homework_submissions')
    .insert({
      ...submission,
      submitted_at: new Date().toISOString(),
    })
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getHomeworkSubmissions = async (assignmentId?: string, studentId?: string) => {
  let query = supabase
    .from('homework_submissions')
    .select('*');
  
  if (assignmentId) {
    query = query.eq('assignment_id', assignmentId);
  }
  
  if (studentId) {
    query = query.eq('student_id', studentId);
  }
  
  const { data, error } = await query.order('submitted_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Helper functions for teacher profiles
export const getTeacherProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('teacher_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateTeacherProfile = async (userId: string, updates: Partial<Tables['teacher_profiles']>) => {
  const { data, error } = await supabase
    .from('teacher_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data[0];
};

// Helper functions for agent profiles
export const getAgentProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateAgentProfile = async (userId: string, updates: Partial<Tables['agents']>) => {
  const { data, error } = await supabase
    .from('agents')
    .update(updates)
    .eq('user_id', userId)
    .select();
  
  if (error) throw error;
  return data[0];
};

// Dashboard content helpers
export const getDashboardContent = async (role: Tables['dashboard_content']['role'], contentType?: string) => {
  let query = supabase
    .from('dashboard_content')
    .select('*')
    .eq('role', role);
  
  if (contentType) {
    query = query.eq('content_type', contentType);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};