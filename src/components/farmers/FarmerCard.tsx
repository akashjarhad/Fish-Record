import { User, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Farmer } from '@/types';

interface FarmerCardProps {
  farmer: Farmer;
  onClick: (farmer: Farmer) => void;
}

export function FarmerCard({ farmer, onClick }: FarmerCardProps) {
  // Generate different gradient colors based on farmer ID or name
  const getFarmerGradient = (farmerId: string | number) => {
    const gradients = [
      'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
      'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500',
      'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500',
      'bg-gradient-to-br from-pink-500 via-rose-500 to-red-500',
      'bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500',
      'bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500',
    ];
    const index = typeof farmerId === 'string' ? farmerId.length % gradients.length : farmerId % gradients.length;
    return gradients[index];
  };

  const gradientClass = getFarmerGradient(farmer.id);

  return (
    <Card className={`group transition-all duration-300 cursor-pointer border-0 relative overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.02] rounded-lg ${gradientClass}`} onClick={() => onClick(farmer)}>
      {/* Simple overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg"></div>
      
      <CardContent className="p-2 sm:p-3 relative z-10 min-h-[50px] sm:min-h-[60px]">
        {/* Responsive compact layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 h-full">
          {/* Icon and Name - Always together */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <h3 className="text-white font-medium text-xs sm:text-sm truncate">
              {farmer.name}
            </h3>
          </div>
          
          {/* Phone - Compact on mobile */}
          {farmer.mobile_no && (
            <p className="text-white/80 text-xs font-medium truncate ml-8 sm:ml-0">
              {farmer.mobile_no}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}