import { ReactNode } from 'react';
import { useUserRole, UserRole } from '@/contexts/UserRoleContext';
import { Shield, Lock } from 'lucide-react';

interface ProtectedComponentProps {
  children: ReactNode;
  requiredRole?: UserRole;
  adminOnly?: boolean;
  fallback?: ReactNode;
  showFallback?: boolean;
}

export default function ProtectedComponent({ 
  children, 
  requiredRole, 
  adminOnly = false, 
  fallback,
  showFallback = true 
}: ProtectedComponentProps) {
  const { userRole, isAdmin } = useUserRole();

  // Check if user has required permissions
  const hasPermission = () => {
    if (adminOnly || requiredRole === 'admin') {
      return isAdmin;
    }
    if (requiredRole) {
      return userRole === requiredRole;
    }
    return true; // No specific role required
  };

  if (!hasPermission()) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    if (!showFallback) {
      return null;
    }

    return (
      <div className="glass border-0 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/10 border border-white/20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-red-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Access Restricted</h3>
            <p className="text-white/70 text-sm">
              {adminOnly || requiredRole === 'admin' 
                ? 'Administrator privileges required' 
                : `${requiredRole} role required`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback, showFallback = true }: { 
  children: ReactNode; 
  fallback?: ReactNode;
  showFallback?: boolean;
}) {
  return (
    <ProtectedComponent adminOnly fallback={fallback} showFallback={showFallback}>
      {children}
    </ProtectedComponent>
  );
}

export function AdminBadge() {
  const { isAdmin } = useUserRole();
  
  if (!isAdmin) return null;
  
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full">
      <Shield className="w-3 h-3" />
      Admin
    </div>
  );
}
