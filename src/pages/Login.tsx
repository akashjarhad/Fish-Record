import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { PondLogo } from '@/components/ui/pond-logo';

export default function Login() {
  const { user, signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Please fill in all fields' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = isSignUpMode 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast({ 
          title: isSignUpMode ? 'Sign up failed' : 'Sign in failed', 
          description: error.message,
          variant: 'destructive'
        });
      } else if (isSignUpMode) {
        toast({ 
          title: 'Account created successfully!', 
          description: 'Please check your email to verify your account.',
        });
        setIsSignUpMode(false);
      }
    } catch (err) {
      toast({ 
        title: 'Something went wrong', 
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6 border border-white/20 shadow-2xl">
            <PondLogo size={60} className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Fish Record</span>!
          </h1>
          <p className="text-white/70 text-lg">
            {isSignUpMode ? 'Create Your Account' : 'Your Gateway to Smart Fish Management'}
          </p>
        </div>

        {/* Login form */}
        <div className="glass border-0 rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign in/up button */}
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim() || !password.trim()}
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isSignUpMode ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isSignUpMode ? 'Sign Up' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Toggle between sign in/up */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              {isSignUpMode ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  setEmail('');
                  setPassword('');
                }}
                className="text-white font-semibold hover:text-purple-300 transition-colors inline-flex items-center gap-1"
              >
                {isSignUpMode ? "Sign in here!" : "Sign up here!"}
                <PondLogo size={16} className="ml-1" />
              </button>
            </p>
          </div>
        </div>

          {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            © 2024 Fish Record Management System
          </p>
        </div>
      </div>
    </div>
  );
}
