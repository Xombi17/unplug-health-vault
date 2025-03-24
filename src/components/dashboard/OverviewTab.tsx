
import React from 'react';
import { Plus, ChevronRight, Pill, Calendar, Activity } from 'lucide-react';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  AreaChart, Area, PieChart, Pie, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

interface OverviewTabProps {
  userData: {
    vaccineHistory: { date: string; name: string; provider: string }[];
    notifications: { id: number; title: string; message: string; date: string; read: boolean }[];
  };
  healthTrendData: { month: string; weight: number; bloodPressure: number; heartRate: number }[];
  vaccineComplianceData: { name: string; value: number }[];
  COLORS: string[];
}

const OverviewTab = ({ userData, healthTrendData, vaccineComplianceData, COLORS }: OverviewTabProps) => {
  const markNotificationAsRead = (id: number) => {
    // In a real app, this would update the backend
    toast.success("Notification marked as read");
  };

  const scheduleAppointment = () => {
    toast.success("Appointment scheduled successfully!");
  };

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
              <Calendar className="h-5 w-5 text-health-500" />
            </div>
          </div>
        </GlassMorphismCard>
        
        <GlassMorphismCard className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Vaccine</p>
              <h3 className="text-xl font-medium mt-1">COVID-19 Booster</h3>
              <p className="text-sm text-muted-foreground mt-1">2024-05-20</p>
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
        
        <NotificationsCard 
          notifications={userData.notifications} 
          onNotificationClick={markNotificationAsRead} 
        />
      </div>
    </>
  );
};

// NotificationsCard is a component used within OverviewTab
const NotificationsCard = ({ 
  notifications, 
  onNotificationClick 
}: { 
  notifications: { id: number; title: string; message: string; date: string; read: boolean }[]; 
  onNotificationClick: (id: number) => void;
}) => {
  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Notifications</CardTitle>
        <Badge variant="outline" className="bg-health-500/10 text-health-400 border-health-500/20">
          {notifications.filter(n => !n.read).length} New
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={cn(
                "p-3 rounded-lg border backdrop-blur-sm relative transition-colors",
                notification.read 
                  ? "bg-black/10 border-white/5" 
                  : "bg-black/20 border-health-600/20 hover:bg-white/5"
              )}
              onClick={() => onNotificationClick(notification.id)}
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
  );
};

export default OverviewTab;

// Add missing import at the top
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
