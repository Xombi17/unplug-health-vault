
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarItemProps { 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean; 
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon, 
  text, 
  active = false, 
  onClick 
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-2 rounded-lg text-sm font-medium transition-colors",
        active 
          ? "bg-health-600/20 text-health-400" 
          : "text-muted-foreground hover:bg-white/5 hover:text-white"
      )}
    >
      <span className={active ? "text-health-400" : "text-muted-foreground"}>{icon}</span>
      {text}
    </button>
  );
};

export default SidebarItem;
