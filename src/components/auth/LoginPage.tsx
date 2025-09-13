import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { PondLogo } from "@/components/ui/pond-logo";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();

  console.log('LoginPage render - isSignUp:', isSignUp);

  const handleToggle = () => {
    console.log('handleToggle called, current isSignUp:', isSignUp);
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in."
        });
      }
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await signUp(email, password);
      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account."
        });
        setIsSignUp(false); // Switch back to sign in mode
      }
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-elegant/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-3xl mb-6 shadow-xl relative">
            <PondLogo size={36} className="relative z-10 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">
            {isSignUp ? 'Join ' : 'Welcome to '}
            <span className="gradient-text-primary">Fish Record</span>{isSignUp ? '!' : '!'}
          </h1>
          <p className="text-muted-foreground dark:text-white/70 text-lg">
            {isSignUp ? 'Create your account for Smart Fish Management' : 'Your Gateway to Smart Fish Management'}
          </p>
        </div>

        {/* Login form */}
        <div className="glass border-0 rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-card/80 border border-border/20">
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-foreground dark:text-white/90 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-white/50" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-muted/20 dark:bg-white/5 border-border dark:border-white/20 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 focus:border-primary dark:focus:border-white/40 focus:bg-card dark:focus:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-foreground dark:text-white/90 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-white/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-muted/20 dark:bg-white/5 border-border dark:border-white/20 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 focus:border-primary dark:focus:border-white/40 focus:bg-card dark:focus:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-white/50 hover:text-foreground dark:hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <Button
              type="submit"
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full h-14 bg-gradient-primary hover:shadow-lg text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Toggle between sign in and sign up */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground dark:text-white/70">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{" "}
            </p>
            <div 
              onClick={handleToggle}
              className="text-primary dark:text-white font-semibold hover:text-primary/80 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer mt-2 underline select-none"
              role="button"
              tabIndex={0}
            >
              {isSignUp ? 'Sign in here!' : 'Sign up here!'}
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground dark:text-white/50 text-sm">
            © 2025 Fish Record Management System
          </p>
        </div>
      </div>
    </div>
  );
}
