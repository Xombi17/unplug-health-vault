import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, Calendar, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';
import { vaccineService } from '@/lib/services/vaccineService';

interface Vaccine {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'pending' | 'overdue';
  certificate?: string;
  nextDueDate?: string;
  provider?: string;
  batchNumber?: string;
}

interface VaccineRecommendation {
  name: string;
  description: string;
  dueDate: string;
  importance: 'high' | 'medium' | 'low';
}

const VaccinesTab = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [recommendations, setRecommendations] = useState<VaccineRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadVaccineData();
  }, []);

  const loadVaccineData = async () => {
    try {
      setIsLoading(true);
      const [history, recommendations] = await Promise.all([
        vaccineService.getVaccineHistory(),
        vaccineService.getVaccineRecommendations()
      ]);

      const processedVaccines = history.map(vaccine => ({
        ...vaccine,
        id: Math.random().toString(36).substr(2, 9),
        status: vaccineService.determineVaccineStatus(vaccine)
      }));

      setVaccines(processedVaccines);
      setRecommendations(recommendations);
    } catch (error) {
      toast.error('Failed to load vaccine data');
      console.error('Error loading vaccine data:', error);
      // Use mock data if API fails
      setVaccines(mockVaccines);
      setRecommendations(mockRecommendations);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificateUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const vaccineData = await vaccineService.processCertificate(file);
      await vaccineService.saveVaccineRecord(vaccineData);
      
      toast.success('Vaccine certificate processed successfully');
      loadVaccineData(); // Reload the data
    } catch (error) {
      toast.error('Failed to process vaccine certificate');
      console.error('Error processing certificate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVaccineStatusColor = (status: Vaccine['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getImportanceColor = (importance: VaccineRecommendation['importance']) => {
    switch (importance) {
      case 'high':
        return 'bg-red-900/30 text-red-400';
      case 'medium':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'low':
        return 'bg-green-900/30 text-green-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Vaccine Management</h2>
      
      {/* Vaccine Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassMorphismCard className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-green-900/30 flex items-center justify-center mr-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
              <p className="text-2xl font-bold">
                {vaccines.filter(v => v.status === 'completed').length}
              </p>
            </div>
          </div>
        </GlassMorphismCard>
        
        <GlassMorphismCard className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-yellow-900/30 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
              <p className="text-2xl font-bold">
                {vaccines.filter(v => v.status === 'pending').length}
              </p>
            </div>
          </div>
        </GlassMorphismCard>
        
        <GlassMorphismCard className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-red-900/30 flex items-center justify-center mr-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Overdue</h3>
              <p className="text-2xl font-bold">
                {vaccines.filter(v => v.status === 'overdue').length}
              </p>
            </div>
          </div>
        </GlassMorphismCard>
      </div>
      
      {/* Upload Certificate */}
      <GlassMorphismCard className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upload Vaccine Certificate</h3>
          <Button variant="outline" size="sm" className="border-health-500/20 text-health-400">
            <Plus className="mr-2 h-4 w-4" /> Add Manually
          </Button>
        </div>
        
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border border-white/10 rounded-lg cursor-pointer bg-black/20 hover:bg-black/30 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-health-400" />
              <p className="mb-1 text-sm">
                <span className="font-semibold text-health-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PDF, PNG or JPG (MAX. 800x400px)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg"
              onChange={handleCertificateUpload}
              disabled={isLoading}
            />
          </label>
        </div>
      </GlassMorphismCard>
      
      {/* Vaccine History */}
      <GlassMorphismCard className="p-6">
        <h3 className="text-lg font-medium mb-4">Vaccine History</h3>
        <div className="space-y-4">
          {vaccines.map((vaccine) => (
            <div
              key={vaccine.id}
              className="p-4 rounded-lg bg-black/20 border border-white/5 hover:bg-black/30 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{vaccine.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Date: {new Date(vaccine.date).toLocaleDateString()}
                  </p>
                  {vaccine.provider && (
                    <p className="text-sm text-muted-foreground">
                      Provider: {vaccine.provider}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded text-xs ${getVaccineStatusColor(vaccine.status)}`}>
                    {vaccine.status.charAt(0).toUpperCase() + vaccine.status.slice(1)}
                  </span>
                  {vaccine.certificate && (
                    <Button variant="outline" size="sm" className="border-health-500/20 text-health-400">
                      View
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassMorphismCard>
      
      {/* Vaccine Recommendations */}
      <GlassMorphismCard className="p-6">
        <h3 className="text-lg font-medium mb-4">Recommended Vaccines</h3>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.name}
              className="p-4 rounded-lg bg-black/20 border border-white/5 hover:bg-black/30 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{recommendation.name}</h4>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Due: {new Date(recommendation.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${getImportanceColor(recommendation.importance)}`}>
                  {recommendation.importance.charAt(0).toUpperCase() + recommendation.importance.slice(1)} Priority
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassMorphismCard>
    </div>
  );
};

// Mock data for fallback
const mockVaccines: Vaccine[] = [
  {
    id: '1',
    name: 'Influenza (Flu)',
    date: '2023-11-15',
    status: 'completed',
    provider: 'City Health Clinic',
    certificate: 'flu_cert.pdf'
  },
  {
    id: '2',
    name: 'COVID-19',
    date: '2023-09-10',
    status: 'completed',
    provider: 'Memorial Hospital',
    certificate: 'covid_cert.pdf'
  },
  {
    id: '3',
    name: 'Tetanus Booster',
    date: '2023-03-22',
    status: 'completed',
    provider: 'Family Health Center'
  },
  {
    id: '4',
    name: 'COVID-19 Booster',
    date: '2024-05-20',
    status: 'pending',
    nextDueDate: '2024-05-20'
  },
  {
    id: '5',
    name: 'HPV Vaccine',
    date: '2023-12-01',
    status: 'overdue',
    nextDueDate: '2024-03-01'
  }
];

const mockRecommendations: VaccineRecommendation[] = [
  {
    name: 'COVID-19 Booster',
    description: 'Annual booster shot recommended',
    dueDate: '2024-05-20',
    importance: 'high'
  },
  {
    name: 'Influenza (Flu)',
    description: 'Annual seasonal flu vaccine',
    dueDate: '2024-10-15',
    importance: 'medium'
  },
  {
    name: 'Pneumococcal Vaccine',
    description: 'Recommended for adults over 65',
    dueDate: '2024-08-30',
    importance: 'low'
  }
];

export default VaccinesTab;