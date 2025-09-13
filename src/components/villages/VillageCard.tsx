import { Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Village } from '@/types';

interface VillageCardProps {
  village: Village;
  onClick: (village: Village) => void;
}

export function VillageCard({ village, onClick }: VillageCardProps) {
  // Generate different gradient colors based on village ID or name
  const getVillageGradient = (villageId: string | number) => {
    const gradients = [
      'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500',
      'bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500',
      'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500',
      'bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500',
      'bg-gradient-to-br from-lime-500 via-green-500 to-emerald-500',
      'bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500',
    ];
    const index = typeof villageId === 'string' ? villageId.length % gradients.length : villageId % gradients.length;
    return gradients[index];
  };

  const gradientClass = getVillageGradient(village.id);

  return (
    <div className="perspective-1000">
      <Card className={`group transition-all duration-500 cursor-pointer border-0 relative overflow-hidden shadow-lg hover:shadow-xl transform-gpu hover:rotate-y-2 hover:rotate-x-1 hover:scale-105 rounded-2xl ${gradientClass}`} onClick={() => onClick(village)}>
        {/* 3D depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-70 rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent opacity-50 rounded-2xl"></div>
        
        {/* Smaller floating orbs for depth */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white/8 rounded-full blur-md group-hover:scale-110 transition-transform duration-500"></div>
        
        {/* Background decorative icon with smaller size */}
        <div className="absolute top-2 right-2 opacity-15 group-hover:opacity-25 transition-all duration-500 transform-gpu group-hover:scale-110 group-hover:rotate-6">
          <Home className="h-8 w-8 text-white drop-shadow-xl" />
        </div>
        
        <CardContent className="p-3 sm:p-4 relative z-10 h-full flex flex-col justify-between min-h-[100px] sm:min-h-[120px] transform-gpu group-hover:translate-z-10">
          {/* Compact Icon Section */}
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/25 flex items-center justify-center transform-gpu group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg backdrop-blur-sm border border-white/20">
              <Home className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Compact Content Section */}
          <div className="space-y-1 sm:space-y-2 transform-gpu group-hover:translate-z-5">
            <h3 className="text-white font-bold text-sm sm:text-lg tracking-tight drop-shadow-lg truncate">
              {village.village_name}
            </h3>
            
            <p className="text-white/85 text-xs font-semibold drop-shadow-md hidden sm:block">
              Village Details
            </p>
            
            <div className="flex items-center gap-1 text-white/75 text-xs bg-white/10 rounded-lg px-2 py-1 backdrop-blur-sm">
              <span className="font-medium">{village.farmerCount || 0} शेतकरी</span>
            </div>
          </div>

          {/* Simplified edge highlights */}
          <div className="absolute inset-0 rounded-2xl border border-white/25 group-hover:border-white/50 transition-all duration-500"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-t-2xl group-hover:via-white/80 transition-all duration-500"></div>
        </CardContent>
      </Card>
    </div>
  );
}