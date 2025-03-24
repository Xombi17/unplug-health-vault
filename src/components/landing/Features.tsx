
import React from 'react';
import { Archive, Activity, Calendar, Bell, Shield, Users } from 'lucide-react';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

const features = [
  {
    title: 'Centralized Health Records',
    description: 'Store all your medical documents, test results, and health history in one secure place.',
    icon: Archive,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Vaccination Tracking',
    description: 'Keep track of all vaccinations from birth to present, with smart reminders for upcoming shots.',
    icon: Activity,
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Appointment Management',
    description: 'Schedule and manage healthcare appointments across different providers and specialties.',
    icon: Calendar,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Intelligent Reminders',
    description: 'Get personalized notifications for medication, vaccinations, and upcoming appointments.',
    icon: Bell,
    color: 'bg-amber-50 text-amber-600'
  },
  {
    title: 'Privacy & Security',
    description: 'Your data is protected with advanced encryption and strict privacy controls you manage.',
    icon: Shield,
    color: 'bg-red-50 text-red-600'
  },
  {
    title: 'Family Management',
    description: 'Manage health records for your entire family with separate profiles and permissions.',
    icon: Users,
    color: 'bg-teal-50 text-teal-600'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-health-100 blur-3xl opacity-50" />
        <div className="absolute bottom-40 -right-40 h-96 w-96 rounded-full bg-accent blur-3xl opacity-50" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
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
              <GlassMorphismCard className="p-6 h-full flex flex-col">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
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
