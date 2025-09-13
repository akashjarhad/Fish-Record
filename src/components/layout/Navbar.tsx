import { LogOut, Loader2, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AdminBadge } from '@/components/auth/ProtectedComponent';
import { PondLogo } from '@/components/ui/pond-logo';

export function Navbar() {
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-card/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm bg-white/10 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl relative border border-white/20">
                <PondLogo 
                  size={36} 
                  className="sm:w-10 sm:h-10 md:w-14 md:h-14 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                <span className="gradient-text-primary">Fish</span><span className="text-foreground"> Record</span>
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5 font-medium">Management System</p>
            </div>
            {/* Mobile title */}
            <div className="block sm:hidden">
              <h1 className="text-sm font-bold text-foreground tracking-tight">
                <span className="gradient-text-primary">Fish</span><span className="text-foreground"> Record</span>
              </h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {user && (
              <div className="flex items-center space-x-1 sm:space-x-3">
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-muted/50 rounded-lg sm:rounded-xl">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-primary rounded-md sm:rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-xs font-semibold text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {user.email?.split('@')[0]}
                      </span>
                      <AdminBadge />
                    </div>
                  </div>
                </div>
                
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => window.location.href = '/admin'}
                    title="Admin Panel"
                    className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                  >
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  title="Sign out"
                  className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}