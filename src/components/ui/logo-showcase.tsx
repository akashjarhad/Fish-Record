import React from 'react';
import { PondLogo } from '@/components/ui/pond-logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function LogoShowcase() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="gradient-text-primary">Pond Pro</span> Logo Showcase
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Logo */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Default Logo</CardTitle>
              <CardDescription>Standard version with gradients and shadow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center space-x-4">
                <PondLogo size={40} />
                <PondLogo size={60} />
                <PondLogo size={80} />
              </div>
              <p className="text-sm text-muted-foreground">Sizes: 40px, 60px, 80px</p>
            </CardContent>
          </Card>

          {/* Simple Logo */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Simple Logo</CardTitle>
              <CardDescription>Minimalist version for small sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center space-x-4">
                <PondLogo variant="simple" size={40} />
                <PondLogo variant="simple" size={60} />
                <PondLogo variant="simple" size={80} />
              </div>
              <p className="text-sm text-muted-foreground">Clean and minimal</p>
            </CardContent>
          </Card>

          {/* Animated Logo */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Animated Logo</CardTitle>
              <CardDescription>Interactive version with animations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center space-x-4">
                <PondLogo variant="animated" size={40} />
                <PondLogo variant="animated" size={60} />
                <PondLogo variant="animated" size={80} />
              </div>
              <p className="text-sm text-muted-foreground">Swimming fish with ripples</p>
            </CardContent>
          </Card>
        </div>

        {/* Logo in different contexts */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-bold text-center">Logo in Context</h2>
          
          {/* Navbar context */}
          <Card>
            <CardHeader>
              <CardTitle>Navbar Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    <PondLogo 
                      size={40} 
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-foreground tracking-tight">
                      <span className="gradient-text-primary">Pond</span><span className="text-foreground"> Pro</span>
                    </h1>
                    <p className="text-xs text-muted-foreground -mt-0.5 font-medium">Management System</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Different backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="text-white">Dark Background</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PondLogo size={60} />
              </CardContent>
            </Card>

            <Card className="bg-blue-500 text-white">
              <CardHeader>
                <CardTitle className="text-white">Blue Background</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PondLogo size={60} />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="text-white">Gradient Background</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PondLogo size={60} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Usage Examples</h2>
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>How to use the PondLogo component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Default Logo:</h4>
                  <code className="text-purple-600">&lt;PondLogo size={40} /&gt;</code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Simple Logo:</h4>
                  <code className="text-purple-600">&lt;PondLogo variant="simple" size={40} /&gt;</code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Animated Logo:</h4>
                  <code className="text-purple-600">&lt;PondLogo variant="animated" size={40} /&gt;</code>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">With Custom Styling:</h4>
                  <code className="text-purple-600">&lt;PondLogo size={40} className="hover:scale-110 transition-transform" /&gt;</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LogoShowcase;