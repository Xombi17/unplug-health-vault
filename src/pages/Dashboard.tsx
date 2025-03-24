
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OverviewTab from '@/components/dashboard/OverviewTab';
import HealthStatsTab from '@/components/dashboard/HealthStatsTab';
import AnimatedBackground from '@/components/dashboard/AnimatedBackground';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    lastVaccineDate: "2023-11-15",
    upcomingVaccine: "COVID-19 Booster",
    upcomingDate: "2024-05-20",
    vaccineHistory: [
      { date: "2023-11-15", name: "Influenza (Flu)", provider: "City Health Clinic" },
      { date: "2023-09-10", name: "COVID-19", provider: "Memorial Hospital" },
      { date: "2023-03-22", name: "Tetanus Booster", provider: "Family Health Center" },
    ],
    healthMetrics: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      weight: "68 kg",
      height: "175 cm",
      bmi: "22.2"
    },
    notifications: [
      { id: 1, title: "Vaccine Reminder", message: "Your COVID-19 Booster is due in 30 days", date: "2024-04-20", read: false },
      { id: 2, title: "Health Report", message: "Your monthly health report is now available", date: "2024-04-15", read: true },
      { id: 3, title: "Appointment", message: "Doctor's appointment confirmed for next week", date: "2024-04-10", read: false }
    ]
  };

  // Mock health trend data
  const healthTrendData = [
    { month: 'Jan', weight: 67, bloodPressure: 118, heartRate: 70 },
    { month: 'Feb', weight: 67.5, bloodPressure: 119, heartRate: 71 },
    { month: 'Mar', weight: 68, bloodPressure: 120, heartRate: 72 },
    { month: 'Apr', weight: 67.8, bloodPressure: 121, heartRate: 73 },
    { month: 'May', weight: 67.5, bloodPressure: 119, heartRate: 71 },
    { month: 'Jun', weight: 68, bloodPressure: 120, heartRate: 72 },
  ];

  // Mock vaccine compliance data for pie chart
  const vaccineComplianceData = [
    { name: 'Up-to-date', value: 85 },
    { name: 'Due soon', value: 10 },
    { name: 'Overdue', value: 5 },
  ];

  const COLORS = ['#0891b2', '#f97316', '#dc2626'];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const renderDashboardContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            userData={userData} 
            healthTrendData={healthTrendData}
            vaccineComplianceData={vaccineComplianceData}
            COLORS={COLORS}
          />
        );
      case 'health-stats':
        return (
          <HealthStatsTab 
            userData={userData}
            healthTrendData={healthTrendData}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Section under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AnimatedBackground />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userData={userData} 
      />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader userName={userData.name} />
          
          {isLoading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-4 border-health-500/30 border-t-health-500 animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading your health data...</p>
              </div>
            </div>
          ) : (
            renderDashboardContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
