import React, { useState } from 'react';
import { Watch, Activity, Heart, Droplet, LineChart, Plus, RefreshCw, Zap, Bluetooth } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WearableDevice {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness_tracker' | 'cgm' | 'bp_monitor';
  brand: string;
  connected: boolean;
  lastSync?: Date;
}

interface HealthMetric {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  goal?: number;
  color: string;
}

interface ChartData {
  name: string;
  [key: string]: string | number;
}

const mockDevices: WearableDevice[] = [
  {
    id: '1',
    name: 'Apple Watch Series 7',
    type: 'smartwatch',
    brand: 'Apple',
    connected: true,
    lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '2',
    name: 'Fitbit Charge 5',
    type: 'fitness_tracker',
    brand: 'Fitbit',
    connected: false,
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: '3',
    name: 'Dexcom G6',
    type: 'cgm',
    brand: 'Dexcom',
    connected: false,
  },
];

const mockHealthMetrics: HealthMetric[] = [
  {
    id: '1',
    name: 'Steps',
    value: 8432,
    unit: 'steps',
    icon: <Activity className="h-5 w-5" />,
    trend: 'up',
    goal: 10000,
    color: 'text-blue-500',
  },
  {
    id: '2',
    name: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    icon: <Heart className="h-5 w-5" />,
    trend: 'stable',
    color: 'text-red-500',
  },
  {
    id: '3',
    name: 'Sleep',
    value: 7.5,
    unit: 'hours',
    icon: <Zap className="h-5 w-5" />,
    trend: 'up',
    goal: 8,
    color: 'text-purple-500',
  },
  {
    id: '4',
    name: 'Blood Glucose',
    value: 110,
    unit: 'mg/dL',
    icon: <Droplet className="h-5 w-5" />,
    trend: 'down',
    color: 'text-amber-500',
  },
];

const mockHeartRateData: ChartData[] = [
  { name: '12 AM', value: 62 },
  { name: '3 AM', value: 58 },
  { name: '6 AM', value: 65 },
  { name: '9 AM', value: 78 },
  { name: '12 PM', value: 82 },
  { name: '3 PM', value: 76 },
  { name: '6 PM', value: 74 },
  { name: '9 PM', value: 68 },
  { name: 'Now', value: 72 },
];

const mockStepsData: ChartData[] = [
  { name: 'Mon', value: 6500 },
  { name: 'Tue', value: 7200 },
  { name: 'Wed', value: 8100 },
  { name: 'Thu', value: 7400 },
  { name: 'Fri', value: 8432 },
  { name: 'Sat', value: 0 },
  { name: 'Sun', value: 0 },
];

const mockGlucoseData: ChartData[] = [
  { name: '12 AM', value: 105 },
  { name: '3 AM', value: 98 },
  { name: '6 AM', value: 102 },
  { name: '9 AM', value: 145 },
  { name: '12 PM', value: 125 },
  { name: '3 PM', value: 115 },
  { name: '6 PM', value: 132 },
  { name: '9 PM', value: 118 },
  { name: 'Now', value: 110 },
];

const WearableIntegration = () => {
  const [devices, setDevices] = useState<WearableDevice[]>(mockDevices);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(mockHealthMetrics);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleConnectDevice = (deviceId: string) => {
    setIsLoading(true);
    
    // Simulate connection process
    setTimeout(() => {
      const updatedDevices = devices.map(device => {
        if (device.id === deviceId) {
          return {
            ...device,
            connected: true,
            lastSync: new Date(),
          };
        }
        return device;
      });
      
      setDevices(updatedDevices);
      setIsLoading(false);
      toast.success(`Connected to ${updatedDevices.find(d => d.id === deviceId)?.name}`);
    }, 1500);
  };

  const handleSyncData = () => {
    setIsLoading(true);
    
    // Simulate sync process
    setTimeout(() => {
      const updatedDevices = devices.map(device => {
        if (device.connected) {
          return {
            ...device,
            lastSync: new Date(),
          };
        }
        return device;
      });
      
      setDevices(updatedDevices);
      setIsLoading(false);
      toast.success('Health data synchronized successfully');
    }, 2000);
  };

  const getDeviceIcon = (type: WearableDevice['type']) => {
    switch (type) {
      case 'smartwatch':
        return <Watch className="h-5 w-5" />;
      case 'fitness_tracker':
        return <Activity className="h-5 w-5" />;
      case 'cgm':
        return <Droplet className="h-5 w-5" />;
      case 'bp_monitor':
        return <Heart className="h-5 w-5" />;
      default:
        return <Watch className="h-5 w-5" />;
    }
  };

  const getTrendIcon = (trend?: HealthMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↑</span>;
      case 'down':
        return <span className="text-red-500">↓</span>;
      case 'stable':
        return <span className="text-blue-500">→</span>;
      default:
        return null;
    }
  };

  const formatTimeAgo = (date?: Date) => {
    if (!date) return 'Never';
    
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Wearable Health Tracking</h2>
          <p className="text-muted-foreground">
            Connect your devices and monitor your health metrics
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleSyncData}
          disabled={!devices.some(d => d.connected) || isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Sync Data
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center ${metric.color}`}>
                        {metric.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{metric.name}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-2xl font-semibold">{metric.value}</p>
                          <span className="text-xs text-muted-foreground">{metric.unit}</span>
                          {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {metric.goal && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{typeof metric.value === 'number' ? Math.round((metric.value / metric.goal) * 100) : 0}%</span>
                      </div>
                      <Progress 
                        value={typeof metric.value === 'number' ? (metric.value / metric.goal) * 100 : 0} 
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Heart Rate</CardTitle>
                <CardDescription>24-hour trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockHeartRateData}>
                      <defs>
                        <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#888' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#ef4444" 
                        fillOpacity={1} 
                        fill="url(#heartRateGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Blood Glucose</CardTitle>
                <CardDescription>24-hour trend</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockGlucoseData}>
                      <defs>
                        <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#888' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#f59e0b" 
                        fillOpacity={1} 
                        fill="url(#glucoseGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${device.connected ? 'bg-green-900/30' : 'bg-muted'} flex items-center justify-center`}>
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-xs text-muted-foreground">{device.brand}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={device.connected ? 'bg-green-900/30 text-green-400' : 'bg-muted text-muted-foreground'}>
                      {device.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Last synced: {formatTimeAgo(device.lastSync)}
                    </span>
                    {device.connected ? (
                      <Badge variant="outline" className="bg-blue-900/30 text-blue-400 flex items-center gap-1">
                        <Bluetooth className="h-3 w-3" />
                        Active
                      </Badge>
                    ) : (
                      <Button size="sm" onClick={() => handleConnectDevice(device.id)} disabled={isLoading}>
                        <Plus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border border-dashed border-muted-foreground/20">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="font-medium">Add New Device</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Connect a new wearable device to track your health
                </p>
                <Button variant="outline" size="sm">
                  Add Device
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your steps over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockStepsData}>
                    <defs>
                      <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#888' }}
                      formatter={(value) => [`${value} steps`, 'Steps']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#stepsGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Daily Average</p>
                  <p className="text-2xl font-semibold">7,526</p>
                  <p className="text-xs text-muted-foreground">steps</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Weekly Total</p>
                  <p className="text-2xl font-semibold">37,632</p>
                  <p className="text-xs text-muted-foreground">steps</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Goal Completion</p>
                  <p className="text-2xl font-semibold">75%</p>
                  <p className="text-xs text-muted-foreground">of 10,000 daily steps</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WearableIntegration;