
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxElementProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  direction?: 'horizontal' | 'vertical';
  children: React.ReactNode;
  className?: string;
  offset?: number;
  rotateEffect?: boolean;
}

const ParallaxElement = ({
  speed = 0.1,
  direction = 'vertical',
  children,
  className,
  offset = 0,
  rotateEffect = false,
  ...props
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transformValue, setTransformValue] = useState({ translateY: 0, translateX: 0, rotate: 0 });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementVisibility = scrollY + window.innerHeight - elementTop;
      
      if (elementVisibility > 0 && scrollY < elementTop + rect.height) {
        setIsInView(true);
        const translateValue = (scrollY - elementTop + offset) * speed;
        const rotateValue = rotateEffect ? translateValue * 0.1 : 0;
        
        setTransformValue({
          translateY: direction === 'vertical' ? translateValue : 0,
          translateX: direction === 'horizontal' ? translateValue : 0,
          rotate: rotateValue
        });
      } else {
        setIsInView(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset, rotateEffect]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${transformValue.translateY}px) translateX(${transformValue.translateX}px) rotate(${transformValue.rotate}deg)`,
        opacity: isInView ? 1 : 0,
        transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.5s ease-out',
        willChange: 'transform, opacity'
      }}
      className={cn('relative', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
