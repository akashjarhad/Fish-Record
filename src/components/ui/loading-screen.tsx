import React from 'react';
import { PondLogo } from './pond-logo';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-elegant/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Logo with animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-10 h-10 bg-teal-500/30 rounded-full blur-lg animate-ping"></div>
            
            {/* Logo container - smaller container, bigger logo */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <PondLogo size={52} className="relative z-10 drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground dark:text-white mb-3">
          <span className="gradient-text-primary">Fish Record</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-muted-foreground dark:text-white/70 text-lg mb-8">
          Smart Fish Management System
        </p>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gradient-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gradient-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gradient-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-muted-foreground dark:text-white/60 text-sm font-medium animate-pulse">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;