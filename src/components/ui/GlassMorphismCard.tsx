
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  hoverEffect?: boolean;
  glassDark?: boolean;
}

const GlassMorphismCard = ({
  children,
  className,
  intensity = 'medium',
  hoverEffect = true,
  glassDark = true,
  ...props
}: GlassMorphismCardProps) => {
  const intensityClassesLight = {
    light: 'bg-white/30 backdrop-blur-sm',
    medium: 'bg-white/40 backdrop-blur-md',
    heavy: 'bg-white/50 backdrop-blur-lg'
  };

  const intensityClassesDark = {
    light: 'bg-black/20 backdrop-blur-sm',
    medium: 'bg-black/30 backdrop-blur-md',
    heavy: 'bg-black/40 backdrop-blur-lg'
  };

  const intensityClasses = glassDark ? intensityClassesDark : intensityClassesLight;

  return (
    <div
      className={cn(
        'rounded-2xl border overflow-hidden transition-all duration-300',
        glassDark ? 'border-white/10 shadow-xl' : 'border-white/20 shadow-glass',
        intensityClasses[intensity],
        hoverEffect && glassDark 
          ? 'hover:shadow-glow hover:border-white/20 hover:bg-black/40 hover:scale-[1.02]' 
          : hoverEffect 
            ? 'hover:shadow-lg hover:border-white/30 hover:scale-[1.02]'
            : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassMorphismCard;
