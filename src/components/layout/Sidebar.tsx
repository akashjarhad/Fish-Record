import { Building2, Home, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  current: "dashboard" | "villages" | "farmers" | "profile";
  onNavigate?: (target: SidebarProps["current"]) => void;
  canVillages?: boolean;
  canFarmers?: boolean;
}

export function Sidebar({ current, onNavigate, canVillages = false, canFarmers = false }: SidebarProps) {
  const items: { key: SidebarProps["current"]; label: string; icon: any; disabled?: boolean }[] = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "villages", label: "Villages", icon: MapPin, disabled: !canVillages },
    { key: "farmers", label: "Farmers", icon: Users, disabled: !canFarmers },
    { key: "profile", label: "Groups", icon: Building2 },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-border bg-card/70 backdrop-blur-md">
      <div className="p-4 text-sm font-medium text-muted-foreground">Navigation</div>
      <nav className="flex-1 px-2 space-y-1">
        {items.map(({ key, label, icon: Icon, disabled }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => !disabled && onNavigate?.(key)}
              aria-disabled={disabled}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth border",
                active
                  ? "bg-gradient-aqua/20 text-primary border-primary/30"
                  : "hover:bg-muted/60 text-foreground border-transparent",
                disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center",
                active ? "bg-gradient-aqua shadow-soft" : "bg-muted"
              )}>
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-muted-foreground")} />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-muted-foreground">© Aquafarm</div>
    </aside>
  );
}
