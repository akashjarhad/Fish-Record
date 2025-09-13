import React from 'react';
import { PondLogo } from '@/components/ui/pond-logo';

export function LogoTest() {
  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Logo Test Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Default Logo (Size 40)</h2>
          <PondLogo size={40} />
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Default Logo (Size 80)</h2>
          <PondLogo size={80} />
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Simple Logo (Size 40)</h2>
          <PondLogo variant="simple" size={40} />
        </div>
        
        <div className="p-4 border rounded-lg bg-slate-800">
          <h2 className="text-lg font-semibold mb-2 text-white">Logo on Dark Background</h2>
          <PondLogo size={60} />
        </div>
      </div>
    </div>
  );
}