
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Heart, Activity } from 'lucide-react';
import ParallaxElement from '@/components/ui/ParallaxElement';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
      
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
        <div className="absolute inset-0 neo-gradient opacity-20"></div>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl opacity-30" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-10" ref={containerRef}>
        <div className="flex flex-col items-center text-center relative">
          <AnimatedSection delay={100}>
            <span className="inline-block px-4 py-2 mb-6 rounded-full bg-health-900/40 text-health-400 font-medium text-sm border border-health-700/50 shimmer">
              Your health records, unified and secure
            </span>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight max-w-4xl mb-6 text-glow">
              Keep your medical history{" "}
              <span className="text-health-400">organized and accessible</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              HealthVault helps you store and track all your medical records in one secure place, 
              from vaccinations to dental checkups to prescriptions.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={400} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg bg-health-600 text-white font-medium transition-all hover:bg-health-700 hover:shadow-glow flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="#features"
              className="px-8 py-3 rounded-lg border border-white/10 backdrop-blur-sm bg-white/5 text-white font-medium transition-all hover:bg-white/10 hover:border-white/20"
            >
              Learn More
            </Link>
          </AnimatedSection>

          {/* 3D Parallax Elements */}
          <AnimatedSection delay={500} className="w-full max-w-4xl">
            <div className="relative w-full aspect-[16/9] perspective">
              <div 
                className="w-full h-full glass-dark p-4 md:p-8 relative overflow-hidden preserve-3d shadow-xl border border-white/10 rounded-2xl"
                style={{
                  transform: `rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 10}deg)`
                }}
              >
                {/* Dashboard preview */}
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Health dashboard preview" 
                  className="w-full h-full object-cover rounded-lg shadow-md opacity-60 hover:opacity-80 transition-opacity"
                  style={{
                    transform: `translateZ(20px)`,
                    filter: 'brightness(0.7) contrast(1.2)'
                  }}
                />
                
                {/* Floating elements */}
                <div 
                  className="parallax-item absolute top-10 left-10 glass-dark p-4 rounded-lg shadow-sm border border-white/20 backdrop-blur-md"
                  data-speed="0.08"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="text-health-400" size={24} />
                    <div>
                      <h4 className="font-medium text-sm">Security</h4>
                      <p className="text-xs text-muted-foreground">End-to-end encrypted</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="parallax-item absolute bottom-20 left-20 glass-dark p-4 rounded-lg shadow-sm border border-white/20 backdrop-blur-md"
                  data-speed="0.05"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-health-400" size={24} />
                    <div>
                      <h4 className="font-medium text-sm">Records</h4>
                      <p className="text-xs text-muted-foreground">All in one place</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="parallax-item absolute top-20 right-16 glass-dark p-4 rounded-lg shadow-sm border border-white/20 backdrop-blur-md"
                  data-speed="0.03"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="text-health-400" size={24} />
                    <div>
                      <h4 className="font-medium text-sm">Health</h4>
                      <p className="text-xs text-muted-foreground">Personalized insights</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="parallax-item absolute bottom-16 right-12 glass-dark p-4 rounded-lg shadow-sm border border-white/20 backdrop-blur-md"
                  data-speed="0.07"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="text-health-400" size={24} />
                    <div>
                      <h4 className="font-medium text-sm">Vitals</h4>
                      <p className="text-xs text-muted-foreground">Track your progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
