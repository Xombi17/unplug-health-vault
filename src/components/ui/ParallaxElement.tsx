
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxElementProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
}

const ParallaxElement = ({
  speed = 0.1,
  direction = 'vertical',
  children,
  className,
  ...props
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementVisibility = scrollY + window.innerHeight - elementTop;
      
      if (elementVisibility > 0 && scrollY < elementTop + rect.height) {
        const newOffset = (scrollY - elementTop) * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{
        transform: direction === 'vertical' 
          ? `translateY(${offset}px)` 
          : `translateX(${offset}px)`,
        transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
        willChange: 'transform'
      }}
      className={cn('relative', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
