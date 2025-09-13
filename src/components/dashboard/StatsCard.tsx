import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from '@/components/ui/animated-number';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  const numeric = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]/g, '')) || 0;
  const isCurrency = typeof value !== 'number' && String(value).includes('₹');
  
  return (
    <Card className={cn(
      "group transition-all duration-300 hover:shadow-lg border-0 bg-card shadow-sm backdrop-blur-sm",
      "hover:-translate-y-1 hover:shadow-xl cursor-pointer relative overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider">{title}</p>
            <div className="text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              {typeof value === 'number' ? (
                <AnimatedNumber value={numeric} />
              ) : (
                <AnimatedNumber value={numeric} prefix={isCurrency ? '₹' : ''} />
              )}
            </div>
            {trend && (
              <div className={cn(
                "flex items-center text-sm font-medium",
                trend.positive ? "text-green" : "text-red-500"
              )}>
                <span>{trend.positive ? '+' : '-'}{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary/10 flex items-center justify-center group-hover:bg-gradient-primary/20 transition-all duration-300 group-hover:scale-110">
            <Icon className="h-7 w-7 text-primary group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}