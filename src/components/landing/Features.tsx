
import React from 'react';
import { Archive, Activity, Calendar, Bell, Shield, Users, PieChart, Heart, Zap } from 'lucide-react';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

const features = [
  {
    title: 'Centralized Health Records',
    description: 'Store all your medical documents, test results, and health history in one secure place.',
    icon: Archive,
    color: 'bg-blue-900/30 text-blue-400'
  },
  {
    title: 'Vaccination Tracking',
    description: 'Keep track of all vaccinations from birth to present, with smart reminders for upcoming shots.',
    icon: Activity,
    color: 'bg-cyan-900/30 text-cyan-400'
  },
  {
    title: 'Appointment Management',
    description: 'Schedule and manage healthcare appointments across different providers and specialties.',
    icon: Calendar,
    color: 'bg-indigo-900/30 text-indigo-400'
  },
  {
    title: 'Intelligent Reminders',
    description: 'Get personalized notifications for medication, vaccinations, and upcoming appointments.',
    icon: Bell,
    color: 'bg-amber-900/30 text-amber-400'
  },
  {
    title: 'Privacy & Security',
    description: 'Your data is protected with advanced encryption and strict privacy controls you manage.',
    icon: Shield,
    color: 'bg-red-900/30 text-red-400'
  },
  {
    title: 'Family Management',
    description: 'Manage health records for your entire family with separate profiles and permissions.',
    icon: Users,
    color: 'bg-teal-900/30 text-teal-400'
  },
  {
    title: 'Health Analytics',
    description: 'Visualize health trends and track changes in health metrics over time with detailed graphs.',
    icon: PieChart,
    color: 'bg-purple-900/30 text-purple-400'
  },
  {
    title: 'Medication Tracking',
    description: 'Track medications, dosages, and schedules with smart reminders for when to take them.',
    icon: Heart,
    color: 'bg-pink-900/30 text-pink-400'
  },
  {
    title: 'Quick Access',
    description: 'Instant access to critical health information during emergencies with emergency mode.',
    icon: Zap,
    color: 'bg-orange-900/30 text-orange-400'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 neo-gradient opacity-20"></div>
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl opacity-30" />
        <div className="absolute bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl opacity-30" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-glow">
            Everything you need to manage your health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            HealthVault provides comprehensive tools to keep your medical information organized, secure, and accessible when you need it most.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={feature.title} 
              className="h-full" 
              delay={index * 100}
            >
              <GlassMorphismCard className="p-6 h-full flex flex-col backdrop-blur-md bg-black/20 border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all group">
                <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-health-400 transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassMorphismCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
