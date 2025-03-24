
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, User, Calendar, FileText, Activity, List, 
  Settings, LogOut, TrendingUp, Heart, Pill, Droplet, 
  Plus, ChevronRight, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  LineChart, Line, AreaChart, Area, PieChart, Pie, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Legend 
} from 'recharts';

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

  const markNotificationAsRead = (id) => {
    // In a real app, this would update the backend
    toast.success("Notification marked as read");
  };

  const scheduleAppointment = () => {
    toast.success("Appointment scheduled successfully!");
  };

  const addHealthData = () => {
    toast.success("Health data added successfully!");
  };

  const renderDashboardContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <GlassMorphismCard className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-health-500/10 rounded-bl-full"></div>
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
              
              <GlassMorphismCard className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"></div>
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
              
              <GlassMorphismCard className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Health Status</p>
                    <h3 className="text-xl font-medium mt-1">Excellent</h3>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        All vaccines up to date
                      </Badge>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </GlassMorphismCard>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <GlassMorphismCard className="md:col-span-2 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Health Trends</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-health-500/20 text-health-400">
                      Weight
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/20 text-purple-400">
                      Blood Pressure
                    </Button>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Area type="monotone" dataKey="weight" stroke="#0891b2" fillOpacity={1} fill="url(#colorWeight)" />
                      <Area type="monotone" dataKey="bloodPressure" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorBP)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Vaccine Compliance</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vaccineComplianceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {vaccineComplianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassMorphismCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Vaccine History</CardTitle>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.vaccineHistory.map((vaccine, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 hover:bg-white/5 transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-health-500/10 flex items-center justify-center mr-3">
                            <Pill className="h-5 w-5 text-health-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{vaccine.name}</h4>
                            <p className="text-sm text-muted-foreground">{vaccine.provider}</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{vaccine.date}</div>
                      </div>
                    ))}
                    <Button onClick={scheduleAppointment} className="w-full mt-2 bg-health-600 hover:bg-health-700">
                      <Plus className="mr-2 h-4 w-4" /> Schedule New Vaccine
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Notifications</CardTitle>
                  <Badge variant="outline" className="bg-health-500/10 text-health-400 border-health-500/20">
                    {userData.notifications.filter(n => !n.read).length} New
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-3 rounded-lg border backdrop-blur-sm relative transition-colors",
                          notification.read 
                            ? "bg-black/10 border-white/5" 
                            : "bg-black/20 border-health-600/20 hover:bg-white/5"
                        )}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        {!notification.read && (
                          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-health-500"></span>
                        )}
                        <div className="flex items-center gap-3 mb-1">
                          <Bell className={cn(
                            "h-4 w-4",
                            notification.read ? "text-muted-foreground" : "text-health-400"
                          )} />
                          <h4 className={cn(
                            "font-medium text-sm",
                            notification.read ? "text-muted-foreground" : "text-white"
                          )}>
                            {notification.title}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground ml-7">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2 ml-7">{notification.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );
      case 'health-stats':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Health Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard label="Blood Pressure" value={userData.healthMetrics.bloodPressure} icon={<Heart className="h-5 w-5 text-red-400" />} />
              <MetricCard label="Heart Rate" value={userData.healthMetrics.heartRate} icon={<Activity className="h-5 w-5 text-health-400" />} />
              <MetricCard label="Weight" value={userData.healthMetrics.weight} icon={<TrendingUp className="h-5 w-5 text-purple-400" />} />
              <MetricCard label="Height" value={userData.healthMetrics.height} icon={<User className="h-5 w-5 text-blue-400" />} />
            </div>
            
            <GlassMorphismCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">BMI Tracking</h3>
                <Button variant="outline" size="sm" onClick={addHealthData} className="border-health-500/20 text-health-400">
                  <Plus className="mr-2 h-4 w-4" /> Add New Data
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">BMI</span>
                  <span className="text-sm font-medium">{userData.healthMetrics.bmi}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-health-500 rounded-full" 
                    style={{ width: '45%' }}
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Your BMI indicates you're in the healthy weight range
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line type="monotone" dataKey="heartRate" stroke="#0891b2" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassMorphismCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassMorphismCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Recommended Targets</h3>
                <div className="space-y-4">
                  <TargetCard 
                    label="Daily Steps" 
                    current="7,520" 
                    target="10,000" 
                    percentage={75} 
                    color="health" 
                  />
                  <TargetCard 
                    label="Water Intake" 
                    current="1.5L" 
                    target="2.5L" 
                    percentage={60} 
                    color="blue" 
                  />
                  <TargetCard 
                    label="Sleep" 
                    current="6.5h" 
                    target="8h" 
                    percentage={80} 
                    color="purple" 
                  />
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-6">
                <h3 className="text-lg font-medium mb-4">Health Recommendations</h3>
                <div className="space-y-3">
                  <RecommendationCard 
                    title="Increase water intake"
                    description="Try to drink at least 2.5L of water daily"
                    icon={<Droplet className="h-5 w-5 text-blue-400" />}
                  />
                  <RecommendationCard 
                    title="Get more exercise"
                    description="Aim for 30 minutes of moderate activity daily"
                    icon={<Activity className="h-5 w-5 text-purple-400" />}
                  />
                  <RecommendationCard 
                    title="Schedule annual check-up"
                    description="It's been 10 months since your last visit"
                    icon={<Calendar className="h-5 w-5 text-health-400" />}
                  />
                </div>
              </GlassMorphismCard>
            </div>
          </div>
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
                <p className="text-muted-foreground mt-1">Here's an overview of your health records</p>
              </div>
              <div>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <Bell className="h-5 w-5 mr-2" />
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-health-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-health-500"></span>
                  </span>
                </Button>
              </div>
            </div>
          </header>
          
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

const MetricCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => {
  return (
    <div className="p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 transition-transform hover:scale-105">
      <div className="flex items-center mb-2">
        <div className="mr-2">{icon}</div>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
};

const TargetCard = ({ 
  label, 
  current, 
  target, 
  percentage, 
  color 
}: { 
  label: string, 
  current: string, 
  target: string, 
  percentage: number, 
  color: 'health' | 'blue' | 'purple' 
}) => {
  const getColorClass = () => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-health-500';
    }
  };
  
  return (
    <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{current} / {target}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getColorClass())} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const RecommendationCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode 
}) => {
  return (
    <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
