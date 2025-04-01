import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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
      const response = await axios.post(`${API_BASE_URL}/vaccines/process-certificate`, formData, {
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
      const response = await axios.get(`${API_BASE_URL}/vaccines/recommendations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vaccine recommendations:', error);
      throw new Error('Failed to fetch vaccine recommendations');
    }
  },

  async saveVaccineRecord(vaccineData: VaccineData): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/vaccines/records`, vaccineData);
    } catch (error) {
      console.error('Error saving vaccine record:', error);
      throw new Error('Failed to save vaccine record');
    }
  },

  async getVaccineHistory(): Promise<VaccineData[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/vaccines/history`);
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
    
    if (!vaccine.nextDueDate) return 'completed';
    
    const nextDueDate = new Date(vaccine.nextDueDate);

    if (nextDueDate < today) {
      return 'overdue';
    }

    return 'pending';
  },
};