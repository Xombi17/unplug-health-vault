
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fade-in' | 'scale-in' | 'fade-up' | 'slide-up' | 'none';
  delay?: number;
  duration?: number;
}

const AnimatedSection = ({
  children,
  className,
  threshold = 0.1,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  ...props
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    if (animation === 'none' || isVisible) return {};
    
    if (animation === 'fade-up' || animation === 'slide-up') {
      return {
        opacity: 0,
        transform: 'translateY(40px)'
      };
    }
    
    if (animation === 'fade-in') {
      return {
        opacity: 0
      };
    }
    
    if (animation === 'scale-in') {
      return {
        opacity: 0,
        transform: 'scale(0.95)'
      };
    }
    
    return {};
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-[opacity,transform]',
        className
      )}
      style={{ 
        ...getAnimationStyles(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
        opacity: isVisible ? 1 : getAnimationStyles().opacity,
        transform: isVisible ? 'translateY(0) scale(1)' : getAnimationStyles().transform
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
