
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Heart } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = containerRef.current!.querySelectorAll('.parallax-item');
      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.05');
        (el as HTMLElement).style.transform = `translate(${x * 100 * speed}px, ${y * 100 * speed}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-health-200 blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-health-300 blur-3xl opacity-40" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-10" ref={containerRef}>
        <div className="flex flex-col items-center text-center relative">
          <span className="inline-block px-4 py-2 mb-6 rounded-full bg-health-100 text-health-800 font-medium text-sm">
            Your health records, unified and secure
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight max-w-4xl mb-6">
            Keep your medical history{" "}
            <span className="text-health-600">organized and accessible</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            HealthVault helps you store and track all your medical records in one secure place, 
            from vaccinations to dental checkups to prescriptions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg bg-health-600 text-white font-medium transition-all hover:bg-health-700 hover:shadow-md flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="#features"
              className="px-8 py-3 rounded-lg border border-health-300 bg-white/80 text-health-800 font-medium transition-all hover:bg-health-50 hover:border-health-400"
            >
              Learn More
            </Link>
          </div>

          {/* 3D Parallax Elements */}
          <div className="relative w-full max-w-4xl aspect-[16/9] perspective">
            <div className="w-full h-full glass-card p-4 md:p-8 relative overflow-hidden preserve-3d shadow-soft">
              {/* Dashboard preview */}
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Health dashboard preview" 
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              
              {/* Floating elements */}
              <div 
                className="parallax-item absolute top-10 left-10 glass-card p-4 rounded-lg shadow-sm"
                data-speed="0.08"
              >
                <div className="flex items-center gap-3">
                  <Shield className="text-health-600" size={24} />
                  <div>
                    <h4 className="font-medium text-sm">Security</h4>
                    <p className="text-xs text-muted-foreground">End-to-end encrypted</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="parallax-item absolute bottom-20 left-20 glass-card p-4 rounded-lg shadow-sm"
                data-speed="0.05"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-health-600" size={24} />
                  <div>
                    <h4 className="font-medium text-sm">Records</h4>
                    <p className="text-xs text-muted-foreground">All in one place</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="parallax-item absolute top-24 right-16 glass-card p-4 rounded-lg shadow-sm"
                data-speed="0.03"
              >
                <div className="flex items-center gap-3">
                  <Heart className="text-health-600" size={24} />
                  <div>
                    <h4 className="font-medium text-sm">Health</h4>
                    <p className="text-xs text-muted-foreground">Personalized insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
