
import React from 'react';
import { cn } from '@/lib/utils';

interface TargetCardProps { 
  label: string;
  current: string;
  target: string;
  percentage: number;
  color: 'health' | 'blue' | 'purple';
}

const TargetCard = ({ 
  label, 
  current, 
  target, 
  percentage, 
  color 
}: TargetCardProps) => {
  const getColorClass = () => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-health-500';
    }
  };
  
  return (
    <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{current} / {target}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getColorClass())} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default TargetCard;
