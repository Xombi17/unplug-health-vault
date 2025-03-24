
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import VaccineTracker from '@/components/landing/VaccineTracker';
import Benefits from '@/components/landing/Benefits';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initialize any page-wide effects or animations here
    const handleMouseMove = (e: MouseEvent) => {
      // Update custom cursor position
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive');
      
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setCursorPosition({ x: -100, y: -100 });
    };

    // Init ScrollReveal for elements with data-scroll attribute
    const initScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('[data-scroll]');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize scroll animations
    initScrollAnimations();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Custom cursor effect */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-difference transition-all duration-100 ease-out"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          width: isHovering ? '50px' : '20px',
          height: isHovering ? '50px' : '20px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: isHovering ? '0 0 15px rgba(255, 255, 255, 0.7)' : 'none',
          opacity: cursorPosition.x < 0 ? 0 : 1
        }}
      ></div>
      
      {/* Light beam effect following the cursor */}
      <div 
        className="fixed pointer-events-none z-40 opacity-20 mix-blend-overlay blur-3xl transition-all duration-500 ease-out"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0) 70%)',
          opacity: cursorPosition.x < 0 ? 0 : 0.2
        }}
      ></div>
      
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        <VaccineTracker />
        <Benefits />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
