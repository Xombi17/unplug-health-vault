
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Calendar, ChevronRight, Syringe, Clock, BadgeCheck } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ParallaxElement from '@/components/ui/ParallaxElement';

// Sample vaccine data
const vaccineData = [
  {
    id: 1,
    name: 'Hepatitis B',
    status: 'completed',
    date: '2022-08-15',
    notes: 'First dose',
  },
  {
    id: 2,
    name: 'Hepatitis B',
    status: 'completed',
    date: '2022-09-15',
    notes: 'Second dose',
  },
  {
    id: 3,
    name: 'Hepatitis B',
    status: 'completed',
    date: '2023-02-15',
    notes: 'Third dose',
  },
  {
    id: 4,
    name: 'DTaP',
    status: 'completed',
    date: '2022-10-10',
    notes: 'First dose',
  },
  {
    id: 5,
    name: 'DTaP',
    status: 'completed',
    date: '2022-12-10',
    notes: 'Second dose',
  },
  {
    id: 6,
    name: 'DTaP',
    status: 'scheduled',
    date: '2023-06-10',
    notes: 'Third dose',
  },
  {
    id: 7,
    name: 'Polio',
    status: 'pending',
    date: null,
    notes: 'First dose recommended',
  },
];

const upcomingVaccines = [
  {
    name: 'DTaP',
    dueDate: '2023-06-10',
    description: 'Third dose',
    importance: 'high',
  },
  {
    name: 'Influenza',
    dueDate: '2023-11-15',
    description: 'Annual dose',
    importance: 'medium',
  },
  {
    name: 'MMR',
    dueDate: '2023-08-20',
    description: 'First dose',
    importance: 'high',
  },
];

const VaccineTracker = () => {
  const [activeTab, setActiveTab] = useState('history');
  
  return (
    <section id="vaccines" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 neo-gradient opacity-20"></div>
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl opacity-30" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <AnimatedSection className="order-2 md:order-1">
            <div className="backdrop-blur-md bg-black/20 rounded-2xl shadow-xl border border-white/10 overflow-hidden">
              <div className="flex border-b border-white/10">
                <button
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'text-health-400 border-b-2 border-health-500'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Vaccine History
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    activeTab === 'upcoming'
                      ? 'text-health-400 border-b-2 border-health-500'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Vaccines
                </button>
              </div>

              <div className="p-4">
                {activeTab === 'history' ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {vaccineData.map((vaccine) => (
                      <div
                        key={vaccine.id}
                        className="p-3 rounded-lg border border-white/10 backdrop-blur-sm bg-black/30 flex items-center gap-4 hover:bg-black/40 transition-colors group"
                      >
                        {vaccine.status === 'completed' ? (
                          <CheckCircle className="text-green-400 shrink-0" size={20} />
                        ) : vaccine.status === 'scheduled' ? (
                          <Calendar className="text-blue-400 shrink-0" size={20} />
                        ) : (
                          <AlertTriangle className="text-amber-400 shrink-0" size={20} />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium group-hover:text-health-400 transition-colors">{vaccine.name}</h4>
                            {vaccine.date && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(vaccine.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{vaccine.notes}</p>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {upcomingVaccines.map((vaccine, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-white/10 backdrop-blur-sm bg-black/30 hover:bg-black/40 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium hover:text-health-400 transition-colors">{vaccine.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            vaccine.importance === 'high' 
                              ? 'bg-red-900/50 text-red-400 border border-red-800/50' 
                              : 'bg-amber-900/50 text-amber-400 border border-amber-800/50'
                          }`}>
                            {vaccine.importance === 'high' ? 'Required' : 'Recommended'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{vaccine.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          Due: {new Date(vaccine.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="order-1 md:order-2">
            <ParallaxElement speed={0.03}>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-glow">
                Never miss an important vaccination
              </h2>
            </ParallaxElement>
            <ParallaxElement speed={0.05}>
              <p className="text-lg text-muted-foreground mb-6">
                Our intelligent vaccination tracking system keeps a comprehensive record of all vaccines from birth onwards and provides smart recommendations for upcoming vaccinations.
              </p>
            </ParallaxElement>
            <ParallaxElement speed={0.07}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-900/50 flex items-center justify-center mt-0.5 border border-green-800/50">
                    <Syringe className="text-green-400" size={14} />
                  </div>
                  <p className="text-muted-foreground">Complete vaccination history with dates and details</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center mt-0.5 border border-blue-800/50">
                    <Clock className="text-blue-400" size={14} />
                  </div>
                  <p className="text-muted-foreground">Personalized vaccine schedule based on age and medical history</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-cyan-900/50 flex items-center justify-center mt-0.5 border border-cyan-800/50">
                    <BadgeCheck className="text-cyan-400" size={14} />
                  </div>
                  <p className="text-muted-foreground">Timely reminders for upcoming vaccinations</p>
                </li>
              </ul>
            </ParallaxElement>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VaccineTracker;
