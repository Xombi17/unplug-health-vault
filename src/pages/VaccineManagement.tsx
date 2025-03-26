import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { vaccineService } from '@/lib/services/vaccineService';
import { toast } from 'sonner';

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

const VaccineManagement = () => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vaccine Management</h1>
      
      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Vaccine Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, PNG or JPG (MAX. 800x400px)</p>
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
        </CardContent>
      </Card>

      {/* Vaccine Status Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Vaccine Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-semibold">Completed</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {vaccines.filter(v => v.status === 'completed').length}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-yellow-500 mr-2" />
                <span className="font-semibold">Pending</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {vaccines.filter(v => v.status === 'pending').length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                <span className="font-semibold">Overdue</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {vaccines.filter(v => v.status === 'overdue').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaccine List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Vaccine History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vaccines.map((vaccine) => (
              <div
                key={vaccine.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{vaccine.name}</h3>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(vaccine.date).toLocaleDateString()}
                  </p>
                  {vaccine.provider && (
                    <p className="text-sm text-gray-500">
                      Provider: {vaccine.provider}
                    </p>
                  )}
                  {vaccine.nextDueDate && (
                    <p className="text-sm text-gray-500">
                      Next Due: {new Date(vaccine.nextDueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getVaccineStatusColor(vaccine.status)}>
                    {vaccine.status.charAt(0).toUpperCase() + vaccine.status.slice(1)}
                  </span>
                  {vaccine.certificate && (
                    <Button variant="outline" size="sm">
                      View Certificate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vaccine Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Vaccines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.name}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{recommendation.name}</h3>
                    <p className="text-sm text-gray-500">{recommendation.description}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(recommendation.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    recommendation.importance === 'high' 
                      ? 'bg-red-100 text-red-800'
                      : recommendation.importance === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {recommendation.importance.charAt(0).toUpperCase() + recommendation.importance.slice(1)} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccineManagement; 