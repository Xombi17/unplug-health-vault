import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Drug {
  id: string;
  name: string;
  dosage?: string;
  frequency?: string;
}

export interface Interaction {
  id: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  drugs: [string, string]; // Pair of drug names that interact
}

export const drugService = {
  async searchDrugs(query: string): Promise<Drug[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/drugs/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching drugs:', error);
      // Return mock data if API fails
      return mockDrugs.filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  async getUserMedications(): Promise<Drug[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/drugs/user-medications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user medications:', error);
      // Return empty array if API fails
      return [];
    }
  },

  async saveMedication(drug: Drug): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/drugs/user-medications`, drug);
    } catch (error) {
      console.error('Error saving medication:', error);
      throw new Error('Failed to save medication');
    }
  },

  async removeMedication(drugId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/drugs/user-medications/${drugId}`);
    } catch (error) {
      console.error('Error removing medication:', error);
      throw new Error('Failed to remove medication');
    }
  },

  async checkInteractions(drugIds: string[]): Promise<Interaction[]> {
    try {
      const response = await axios.post(`${API_BASE_URL}/drugs/check-interactions`, { drugIds });
      return response.data;
    } catch (error) {
      console.error('Error checking drug interactions:', error);
      // Return mock interactions if API fails
      return findMockInteractions(drugIds);
    }
  }
};

// Mock data for fallback when API is unavailable
const mockDrugs: Drug[] = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
  { id: '2', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
  { id: '3', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
  { id: '4', name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
  { id: '5', name: 'Levothyroxine', dosage: '50mcg', frequency: 'Once daily' },
  { id: '6', name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
  { id: '7', name: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily' },
  { id: '8', name: 'Sertraline', dosage: '50mg', frequency: 'Once daily' },
  { id: '9', name: 'Warfarin', dosage: '5mg', frequency: 'Once daily' },
  { id: '10', name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed' },
];

const mockInteractions: Interaction[] = [
  {
    id: '1',
    severity: 'high',
    description: 'Warfarin and Aspirin can increase the risk of bleeding when used together.',
    recommendation: 'Avoid concurrent use if possible. If necessary, monitor closely for signs of bleeding.',
    drugs: ['Warfarin', 'Aspirin'],
  },
  {
    id: '2',
    severity: 'medium',
    description: 'Lisinopril and Metformin may increase the risk of hypoglycemia.',
    recommendation: 'Monitor blood glucose levels more frequently when starting or adjusting doses.',
    drugs: ['Lisinopril', 'Metformin'],
  },
  {
    id: '3',
    severity: 'high',
    description: 'Sertraline and Warfarin may increase the risk of bleeding.',
    recommendation: 'Monitor INR more frequently and adjust Warfarin dosage as needed.',
    drugs: ['Sertraline', 'Warfarin'],
  },
  {
    id: '4',
    severity: 'low',
    description: 'Atorvastatin and Amlodipine may increase the plasma concentration of Atorvastatin.',
    recommendation: 'No action typically required, but be aware of potential statin side effects.',
    drugs: ['Atorvastatin', 'Amlodipine'],
  },
  {
    id: '5',
    severity: 'medium',
    description: 'Metoprolol and Amlodipine may cause additive hypotensive effects.',
    recommendation: 'Monitor blood pressure regularly, especially when starting or adjusting doses.',
    drugs: ['Metoprolol', 'Amlodipine'],
  },
  {
    id: '6',
    severity: 'high',
    description: 'Ibuprofen may decrease the antiplatelet effect of Aspirin.',
    recommendation: 'Take Aspirin at least 2 hours before Ibuprofen if possible.',
    drugs: ['Ibuprofen', 'Aspirin'],
  },
];

// Helper function to find interactions between drugs
function findMockInteractions(drugIds: string[]): Interaction[] {
  // Get drug names from IDs
  const drugNames = drugIds.map(id => {
    const drug = mockDrugs.find(d => d.id === id);
    return drug ? drug.name : '';
  }).filter(name => name !== '');

  // Find interactions where both drugs are in the user's list
  return mockInteractions.filter(interaction => {
    const [drug1, drug2] = interaction.drugs;
    return drugNames.includes(drug1) && drugNames.includes(drug2);
  });
}