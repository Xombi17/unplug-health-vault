
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fade-in' | 'scale-in' | 'fade-up' | 'none';
  delay?: number;
}

const AnimatedSection = ({
  children,
  className,
  threshold = 0.1,
  animation = 'fade-in',
  delay = 0,
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

  const getAnimationClass = () => {
    if (animation === 'none' || !isVisible) return '';
    
    if (animation === 'fade-up') {
      return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
    }
    
    return isVisible ? `animate-${animation}` : 'opacity-0';
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        getAnimationClass(),
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`, 
        willChange: 'opacity, transform'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
