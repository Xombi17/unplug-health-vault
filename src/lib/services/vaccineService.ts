import axios from 'axios';

interface VaccineData {
  name: string;
  date: string;
  provider?: string;
  batchNumber?: string;
  nextDueDate?: string;
}

interface VaccineRecommendation {
  name: string;
  description: string;
  dueDate: string;
  importance: 'high' | 'medium' | 'low';
}

export const vaccineService = {
  async processCertificate(file: File): Promise<VaccineData> {
    const formData = new FormData();
    formData.append('certificate', file);

    try {
      // TODO: Replace with actual API endpoint
      const response = await axios.post('/api/vaccines/process-certificate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error processing certificate:', error);
      throw new Error('Failed to process vaccine certificate');
    }
  },

  async getVaccineRecommendations(): Promise<VaccineRecommendation[]> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await axios.get('/api/vaccines/recommendations');
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccine recommendations:', error);
      throw new Error('Failed to fetch vaccine recommendations');
    }
  },

  async saveVaccineRecord(vaccineData: VaccineData): Promise<void> {
    try {
      // TODO: Replace with actual API endpoint
      await axios.post('/api/vaccines/records', vaccineData);
    } catch (error) {
      console.error('Error saving vaccine record:', error);
      throw new Error('Failed to save vaccine record');
    }
  },

  async getVaccineHistory(): Promise<VaccineData[]> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await axios.get('/api/vaccines/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccine history:', error);
      throw new Error('Failed to fetch vaccine history');
    }
  },

  // Helper function to determine vaccine status
  determineVaccineStatus(vaccine: VaccineData): 'completed' | 'pending' | 'overdue' {
    const today = new Date();
    const vaccineDate = new Date(vaccine.date);
    const nextDueDate = vaccine.nextDueDate ? new Date(vaccine.nextDueDate) : null;

    if (!nextDueDate) return 'completed';

    if (nextDueDate < today) {
      return 'overdue';
    }

    return 'pending';
  },
}; 