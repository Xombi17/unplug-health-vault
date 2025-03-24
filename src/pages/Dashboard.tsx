
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, Calendar, FileText, Activity, List, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
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
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 neo-gradient opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      {/* Sidebar */}
      <aside className="w-64 h-screen sticky top-0 bg-black/20 backdrop-blur-md border-r border-white/5">
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8 mt-4">
            <div className="h-10 w-10 rounded-lg bg-health-600 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-medium">HealthVault</span>
          </div>
          
          <nav className="flex-1">
            <div className="space-y-1">
              <SidebarItem 
                icon={<User />} 
                text="Overview" 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')} 
              />
              <SidebarItem 
                icon={<Calendar />} 
                text="Schedule" 
                active={activeTab === 'schedule'} 
                onClick={() => setActiveTab('schedule')} 
              />
              <SidebarItem 
                icon={<FileText />} 
                text="Records" 
                active={activeTab === 'records'} 
                onClick={() => setActiveTab('records')} 
              />
              <SidebarItem 
                icon={<Activity />} 
                text="Health Stats" 
                active={activeTab === 'health-stats'} 
                onClick={() => setActiveTab('health-stats')} 
              />
              <SidebarItem 
                icon={<List />} 
                text="Vaccines" 
                active={activeTab === 'vaccines'} 
                onClick={() => setActiveTab('vaccines')} 
              />
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/5 space-y-1">
              <SidebarItem 
                icon={<Settings />} 
                text="Settings" 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')} 
              />
              <Link to="/" className="no-underline">
                <SidebarItem 
                  icon={<LogOut />} 
                  text="Logout" 
                  active={false} 
                />
              </Link>
            </div>
          </nav>
          
          <div className="pt-6 mt-auto">
            <GlassMorphismCard className="p-4" intensity="light">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-health-400 to-health-600 flex items-center justify-center text-white font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{userData.name}</div>
                  <div className="text-xs text-health-400">Premium Account</div>
                </div>
              </div>
            </GlassMorphismCard>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your health records</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <GlassMorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Vaccine</p>
                  <h3 className="text-xl font-medium mt-1">{userData.vaccineHistory[0].name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{userData.vaccineHistory[0].date}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-health-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-health-500" />
                </div>
              </div>
            </GlassMorphismCard>
            
            <GlassMorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Vaccine</p>
                  <h3 className="text-xl font-medium mt-1">{userData.upcomingVaccine}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{userData.upcomingDate}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </GlassMorphismCard>
            
            <GlassMorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Status</p>
                  <h3 className="text-xl font-medium mt-1">Excellent</h3>
                  <p className="text-sm text-muted-foreground mt-1">All vaccines up to date</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </GlassMorphismCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle>Vaccine History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.vaccineHistory.map((vaccine, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
                      <div>
                        <h4 className="font-medium">{vaccine.name}</h4>
                        <p className="text-sm text-muted-foreground">{vaccine.provider}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{vaccine.date}</div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2 border-white/10 hover:bg-white/5">
                    View All Records
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard label="Blood Pressure" value={userData.healthMetrics.bloodPressure} />
                    <MetricCard label="Heart Rate" value={userData.healthMetrics.heartRate} />
                    <MetricCard label="Weight" value={userData.healthMetrics.weight} />
                    <MetricCard label="Height" value={userData.healthMetrics.height} />
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">BMI</span>
                      <span className="text-sm font-medium">{userData.healthMetrics.bmi}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-health-500 rounded-full" 
                        style={{ width: '45%' }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Normal range</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  text, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean; 
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-2 rounded-lg text-sm font-medium transition-colors",
        active 
          ? "bg-health-600/20 text-health-400" 
          : "text-muted-foreground hover:bg-white/5 hover:text-white"
      )}
    >
      <span className={active ? "text-health-400" : "text-muted-foreground"}>{icon}</span>
      {text}
    </button>
  );
};

const MetricCard = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-medium mt-1">{value}</p>
    </div>
  );
};

export default Dashboard;
