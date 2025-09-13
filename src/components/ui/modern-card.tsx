import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from '@/components/ui/animated-number';

interface ModernCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  gradient: string;
  iconBg?: string;
  className?: string;
  onClick?: () => void;
  trend?: {
    value: number;
    positive: boolean;
    label?: string;
  };
}

export function ModernCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  gradient, 
  iconBg = "bg-white/20", 
  className,
  onClick,
  trend
}: ModernCardProps) {
  const numeric = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, '')) || 0;
  
  return (
    <div className="perspective-1000">
      <Card 
        className={cn(
          "group transition-all duration-500 cursor-pointer border-0 relative overflow-hidden",
          "transform-gpu hover:rotate-y-12 hover:rotate-x-6 hover:scale-105",
          "shadow-2xl hover:shadow-3xl",
          "backdrop-blur-sm",
          gradient,
          "hover:translate-z-20",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          className
        )}
        onClick={onClick}
        style={{
          transform: 'translateZ(0)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent opacity-40"></div>
        
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 shadow-inner-3d"></div>
        
        <CardContent className="p-3 sm:p-4 relative z-10 h-full flex flex-row items-center justify-between min-h-[60px] sm:min-h-[70px] transform-gpu group-hover:translate-z-10">
          {/* Left side - Icon */}
          <div className="flex items-center">
            <div className={cn(
              "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center",
              "transform-gpu group-hover:scale-110 group-hover:rotate-y-15 group-hover:translate-z-8",
              "transition-all duration-500",
              "shadow-lg group-hover:shadow-xl",
              "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/30 before:to-transparent",
              "relative overflow-hidden",
              iconBg
            )}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white relative z-10 drop-shadow-lg" />
              {/* Icon glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Center - Content */}
          <div className="flex-1 ml-3 sm:ml-4">
            <h3 className="text-white font-bold text-sm sm:text-base tracking-tight drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/80 text-xs font-medium drop-shadow-md hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right side - Value */}
          <div className="text-right">
            <div className="text-white/95 font-bold text-xl sm:text-2xl drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300">
              {typeof value === 'number' ? (
                <AnimatedNumber value={numeric} />
              ) : (
                value
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1 mt-1">
                <div className={`text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm transform-gpu group-hover:scale-105 transition-all duration-300 ${
                  trend.positive 
                    ? 'bg-green-500/30 text-green-100 shadow-green-500/20' 
                    : 'bg-red-500/30 text-red-100 shadow-red-500/20'
                } shadow-md`}>
                  {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
                </div>
              </div>
            )}
          </div>

          {/* Background decorative icon */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-all duration-500 transform-gpu group-hover:scale-110 group-hover:rotate-12">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-xl" />
          </div>

          {/* 3D decorative elements with depth */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/8 rounded-full blur-lg transform-gpu group-hover:scale-125 group-hover:translate-z-2 transition-all duration-500"></div>
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-white/6 rounded-full blur-md transform-gpu group-hover:scale-110 group-hover:translate-z-1 transition-all duration-500"></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/4 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          
          {/* Edge highlights for 3D effect */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-500"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:via-white/60 transition-all duration-500"></div>
        </CardContent>
      </Card>
    </div>
  );
}