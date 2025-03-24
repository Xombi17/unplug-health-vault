
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  hoverEffect?: boolean;
}

const GlassMorphismCard = ({
  children,
  className,
  intensity = 'medium',
  hoverEffect = true,
  ...props
}: GlassMorphismCardProps) => {
  const intensityClasses = {
    light: 'bg-white/30 backdrop-blur-sm',
    medium: 'bg-white/40 backdrop-blur-md',
    heavy: 'bg-white/50 backdrop-blur-lg'
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 shadow-glass overflow-hidden transition-all duration-300',
        intensityClasses[intensity],
        hoverEffect && 'hover:shadow-lg hover:border-white/30 hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassMorphismCard;
