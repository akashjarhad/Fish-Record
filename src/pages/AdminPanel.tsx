import { useUserRole } from '@/contexts/UserRoleContext';
import AdminManagement from '@/components/admin/AdminManagement';
import { AdminOnly } from '@/components/auth/ProtectedComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Database, Settings, Activity, BarChart3, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPanel() {
  const { isAdmin } = useUserRole();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-3">
        <Card className="glass border-0 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 max-w-sm sm:max-w-md w-full">
          <CardContent className="text-center py-4 sm:py-8">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-white/50 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Access Denied</h3>
            <p className="text-white/70 mb-4 text-sm sm:text-base">You need administrator privileges to access this panel.</p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl w-full h-10 sm:h-auto text-sm"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-6">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-3 sm:mb-6 border border-white/20">
            <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
            Admin Panel
          </h1>
          <p className="text-white/70 text-xs sm:text-base lg:text-lg px-2">
            System management
          </p>
        </div>


        {/* Admin Management Section */}
        <AdminOnly>
          <AdminManagement />
        </AdminOnly>


        {/* Back to Dashboard */}
        <div className="text-center pt-3 sm:pt-6">
          <Button 
            onClick={() => window.location.href = '/'}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-2xl px-4 sm:px-8 py-2 sm:py-3 h-10 sm:h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-3">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />
              <span className="font-semibold tracking-wide text-xs sm:text-base">Back to Dashboard</span>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-400/30 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </Button>
        </div>
      </div>
    </div>
  );
}
