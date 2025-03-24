
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import VaccineTracker from '@/components/landing/VaccineTracker';
import Benefits from '@/components/landing/Benefits';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseOver = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1.5)';
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '0';
      }
    };

    const handleMouseOut = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.opacity = '1';
      }
    };

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <VaccineTracker />
      <Benefits />
      <Footer />
      
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 rounded-full border-2 border-health-500 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-300 ease-out hidden md:block"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }}
      ></div>
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 rounded-full bg-health-500 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300 ease-out hidden md:block"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px` 
        }}
      ></div>
    </div>
  );
};

export default Index;
