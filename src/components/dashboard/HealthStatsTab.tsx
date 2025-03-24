
import React from 'react';
import { Heart, Activity, TrendingUp, User, Plus, Droplet, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import MetricCard from './MetricCard';
import TargetCard from './TargetCard';
import RecommendationCard from './RecommendationCard';

interface HealthStatsTabProps {
  userData: {
    healthMetrics: {
      bloodPressure: string;
      heartRate: string;
      weight: string;
      height: string;
      bmi: string;
    };
  };
  healthTrendData: { month: string; weight: number; bloodPressure: number; heartRate: number }[];
}

const HealthStatsTab = ({ userData, healthTrendData }: HealthStatsTabProps) => {
  const addHealthData = () => {
    toast.success("Health data added successfully!");
  };

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
};

export default HealthStatsTab;
