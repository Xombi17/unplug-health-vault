
import React from 'react';
import { Shield, Clock, Smartphone, Users } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'No more digging through folders or calling medical offices for your records. Access everything instantly.',
    color: 'bg-amber-900/30 text-amber-400 border-amber-800/50'
  },
  {
    icon: Shield,
    title: 'Enhanced Security',
    description: 'Bank-level encryption protects your sensitive health information while keeping it accessible to you.',
    color: 'bg-green-900/30 text-green-400 border-green-800/50'
  },
  {
    icon: Smartphone,
    title: 'Access Anywhere',
    description: 'Your medical history is available whenever and wherever you need it, on any device.',
    color: 'bg-blue-900/30 text-blue-400 border-blue-800/50'
  },
  {
    icon: Users,
    title: 'Family Management',
    description: 'Keep track of health records for your entire family in one organized place.',
    color: 'bg-purple-900/30 text-purple-400 border-purple-800/50'
  }
];

const testimonials = [
  {
    quote: "HealthVault has been a game-changer for managing my family's vaccinations. I no longer worry about missing important shots for my children.",
    author: "Sarah M.",
    role: "Mother of three",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    quote: "As someone who travels frequently, having my medical records accessible from anywhere has been invaluable. The interface is intuitive and makes tracking my health easy.",
    author: "David L.",
    role: "Business professional",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "The vaccine prediction feature helped me stay on top of my immunizations during pregnancy. I feel much more confident about my health decisions now.",
    author: "Emily K.",
    role: "New parent",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 neo-gradient opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl opacity-30" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-glow">
            Why choose HealthVault
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed to make managing your health records simpler, more secure, and more effective.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <AnimatedSection 
              key={benefit.title} 
              className="h-full" 
              delay={index * 100}
            >
              <GlassMorphismCard className="p-6 h-full flex flex-col items-center text-center backdrop-blur-md bg-black/20 border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all group">
                <div className={`${benefit.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 border group-hover:scale-110 transition-transform`}>
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-health-400 transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </GlassMorphismCard>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-glow">
            What our users say
          </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index} 
              className="h-full" 
              delay={index * 150}
            >
              <GlassMorphismCard className="p-6 h-full flex flex-col backdrop-blur-md bg-black/20 border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all group">
                <div className="mb-4 text-health-400 group-hover:text-health-300 transition-colors">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6 5.6C10.4667 6.13333 9.66667 6.73333 9.2 7.4C8.73333 8.06667 8.5 8.8 8.5 9.6H9.5C10.0667 9.6 10.5 9.76667 10.8 10.1C11.1 10.4333 11.25 10.8667 11.25 11.4C11.25 11.9333 11.0833 12.3667 10.75 12.7C10.4167 13.0333 9.98333 13.2 9.45 13.2C8.78333 13.2 8.23333 12.95 7.8 12.45C7.36667 11.95 7.15 11.3 7.15 10.5C7.15 9.83333 7.3 9.18333 7.6 8.55C7.9 7.91667 8.35 7.33333 8.95 6.8C9.55 6.26667 10.3 5.8 11.2 5.4L11.6 5.6ZM17.6 5.6C16.4667 6.13333 15.6667 6.73333 15.2 7.4C14.7333 8.06667 14.5 8.8 14.5 9.6H15.5C16.0667 9.6 16.5 9.76667 16.8 10.1C17.1 10.4333 17.25 10.8667 17.25 11.4C17.25 11.9333 17.0833 12.3667 16.75 12.7C16.4167 13.0333 15.9833 13.2 15.45 13.2C14.7833 13.2 14.2333 12.95 13.8 12.45C13.3667 11.95 13.15 11.3 13.15 10.5C13.15 9.83333 13.3 9.18333 13.6 8.55C13.9 7.91667 14.35 7.33333 14.95 6.8C15.55 6.26667 16.3 5.8 17.2 5.4L17.6 5.6Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-muted-foreground mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 overflow-hidden mr-3 border border-white/10">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-health-400">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </GlassMorphismCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
