import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Generic hook for fetching data from Supabase
export function useSupabaseData<T>(
  tableName: string,
  options?: {
    select?: string;
    filter?: Record<string, any>;
    order?: { column: string; ascending: boolean };
    limit?: number;
    single?: boolean;
    dependencies?: any[];
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from(tableName)
        .select(options?.select || '*');
      
      // Apply filters
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });
      }
      
      // Apply ordering
      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending });
      }
      
      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      // Get single result or array
      const { data: result, error } = options?.single
        ? await query.single()
        : await query;
      
      if (error) throw error;
      
      setData(result as T);
    } catch (err: any) {
      console.error(`Error fetching data from ${tableName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [tableName, options?.select, options?.filter, options?.order, options?.limit, options?.single, user, ...(options?.dependencies || [])]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Specialized hooks for specific data types

// Hook for fetching homework assignments
export function useHomeworkAssignments(options?: {
  teacherId?: string;
  grade?: string;
  dependencies?: any[];
}) {
  const { userRole } = useAuth();
  
  return useSupabaseData('homework_assignments', {
    filter: {
      ...(options?.teacherId ? { teacher_id: options.teacherId } : {}),
      ...(options?.grade ? { grade: options.grade } : {}),
    },
    order: { column: 'created_at', ascending: false },
    dependencies: options?.dependencies,
  });
}

// Hook for fetching homework submissions
export function useHomeworkSubmissions(options?: {
  assignmentId?: string;
  studentId?: string;
  dependencies?: any[];
}) {
  return useSupabaseData('homework_submissions', {
    select: '*, homework_assignments(*)',
    filter: {
      ...(options?.assignmentId ? { assignment_id: options.assignmentId } : {}),
      ...(options?.studentId ? { student_id: options.studentId } : {}),
    },
    order: { column: 'submitted_at', ascending: false },
    dependencies: options?.dependencies,
  });
}

// Hook for fetching teacher profile
export function useTeacherProfile(userId: string) {
  return useSupabaseData('teacher_profiles', {
    filter: { user_id: userId },
    single: true,
  });
}

// Hook for fetching agent profile
export function useAgentProfile(userId: string) {
  return useSupabaseData('agents', {
    filter: { user_id: userId },
    single: true,
  });
}

// Hook for fetching dashboard content
export function useDashboardContent(role: string, contentType?: string) {
  return useSupabaseData('dashboard_content', {
    filter: {
      role,
      ...(contentType ? { content_type: contentType } : {}),
    },
  });
}

// Hook for fetching users
export function useUsers(options?: {
  role?: string;
  dependencies?: any[];
}) {
  return useSupabaseData('users', {
    filter: {
      ...(options?.role ? { role: options.role } : {}),
    },
    order: { column: 'created_at', ascending: false },
    dependencies: options?.dependencies,
  });
}