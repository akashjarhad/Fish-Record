import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'viewer';

interface UserRoleContextType {
  userRole: UserRole;
  isAdmin: boolean;
  isViewer: boolean;
  isSystemAdmin: boolean;
  addAdminUser: (email: string) => Promise<{ success: boolean; error?: string }>;
  removeAdminUser: (email: string) => Promise<{ success: boolean; error?: string }>;
  getAllAdminUsers: () => Promise<string[]>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

// Define admin users - only these users have full access
let ADMIN_USERS = [
  'rohitunde5@gmail.com',
  'rohit.unde.project@gmail.com',

  // Add new admin emails here:
  // 'newadmin@example.com',
];

interface UserRoleProviderProps {
  children: ReactNode;
}

export function UserRoleProvider({ children }: UserRoleProviderProps) {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('viewer');

  useEffect(() => {
    if (user?.email) {
      checkUserRole(user.email);
    } else {
      setUserRole('viewer');
    }
  }, [user]);

  const checkUserRole = async (email: string) => {
    try {
      // First check hardcoded admin list for fallback
      if (ADMIN_USERS.includes(email.toLowerCase())) {
        setUserRole('admin');
        return;
      }

      // Check database for user role using RPC
      const { data, error } = await (supabase as any).rpc('get_user_role', {
        user_email: email.toLowerCase()
      });

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error checking user role:', error);
        setUserRole('viewer');
        return;
      }

      setUserRole(data || 'viewer');
    } catch (error) {
      console.error('Error in checkUserRole:', error);
      setUserRole('viewer');
    }
  };

  const addAdminUser = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (userRole !== 'admin') {
      return { success: false, error: 'Only admins can add admin users' };
    }

    try {
      const { data, error } = await (supabase as any).rpc('add_admin_user', {
        user_email: email.toLowerCase(),
        created_by_email: user?.email || 'unknown'
      });

      if (error || !data) {
        return { success: false, error: error?.message || 'Failed to add admin user' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to add admin user' };
    }
  };

  const removeAdminUser = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (userRole !== 'admin') {
      return { success: false, error: 'Only admins can remove admin users' };
    }

    // Prevent removing hardcoded admin users
    if (ADMIN_USERS.includes(email.toLowerCase())) {
      return { success: false, error: 'Cannot remove system admin users' };
    }

    try {
      const { data, error } = await (supabase as any).rpc('remove_admin_user', {
        user_email: email.toLowerCase()
      });

      if (error || !data) {
        return { success: false, error: error?.message || 'Failed to remove admin user' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to remove admin user' };
    }
  };

  const getAllAdminUsers = async (): Promise<string[]> => {
    try {
      const { data, error } = await (supabase as any).rpc('get_all_admin_users');

      if (error) {
        console.error('Error fetching admin users:', error);
        return [...ADMIN_USERS];
      }

      // Combine database admins with hardcoded admins
      const dbAdmins = data?.map((row: any) => row.email) || [];
      const allAdmins = [...ADMIN_USERS, ...dbAdmins];
      
      // Remove duplicates
      return [...new Set(allAdmins)];
    } catch (error) {
      console.error('Error in getAllAdminUsers:', error);
      return [...ADMIN_USERS];
    }
  };

  const isAdmin = userRole === 'admin';
  const isViewer = userRole === 'viewer';
  const isSystemAdmin = user?.email ? ADMIN_USERS.includes(user.email.toLowerCase()) : false;

  return (
    <UserRoleContext.Provider value={{ 
      userRole, 
      isAdmin, 
      isViewer, 
      isSystemAdmin,
      addAdminUser, 
      removeAdminUser, 
      getAllAdminUsers 
    }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}
