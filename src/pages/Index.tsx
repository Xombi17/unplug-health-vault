
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import VaccineTracker from '@/components/landing/VaccineTracker';
import Benefits from '@/components/landing/Benefits';
import Footer from '@/components/landing/Footer';

const Index = () => {
  useEffect(() => {
    // Initialize any page-wide effects or animations here
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-follow') as HTMLElement;
      if (cursor) {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      const cursor = document.querySelector('.cursor-follow') as HTMLElement;
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Custom cursor effect */}
      <div className="cursor-follow fixed pointer-events-none w-6 h-6 rounded-full bg-health-500/30 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 z-50 opacity-0 mix-blend-screen"></div>
      
      <Navbar />
      
      <main>
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
