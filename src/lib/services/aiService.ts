import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

interface SymptomCheckRequest {
  symptoms: string;
  userAge?: number;
  userGender?: string;
  existingConditions?: string[];
}

interface DrugInteractionRequest {
  medications: {
    name: string;
    dosage?: string;
    frequency?: string;
  }[];
}

interface DrugInteraction {
  medications: string[];
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

interface HealthInsightRequest {
  metrics: {
    type: string;
    values: { timestamp: string; value: number }[];
  }[];
  timeframe: 'day' | 'week' | 'month' | 'year';
}

interface HealthInsightResponse {
  insights: {
    metricType: string;
    summary: string;
    trends: string[];
    recommendations: string[];
  }[];
  overallAssessment: string;
}

export const aiService = {
  async checkSymptoms(request: SymptomCheckRequest): Promise<string> {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/symptom-check`, request);
      return response.data.advice;
    } catch (error) {
      console.error('Error checking symptoms:', error);
      throw new Error('Failed to analyze symptoms');
    }
  },

  async checkDrugInteractions(request: DrugInteractionRequest): Promise<DrugInteraction[]> {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/drug-interactions`, request);
      return response.data.interactions;
    } catch (error) {
      console.error('Error checking drug interactions:', error);
      throw new Error('Failed to check drug interactions');
    }
  },

  async getHealthInsights(request: HealthInsightRequest): Promise<HealthInsightResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/health-insights`, request);
      return response.data;
    } catch (error) {
      console.error('Error getting health insights:', error);
      throw new Error('Failed to generate health insights');
    }
  },

  // Mock functions for development/testing
  mockCheckSymptoms(symptoms: string): string {
    // Simple keyword-based response for testing
    if (symptoms.toLowerCase().includes('headache')) {
      return "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or more serious conditions. If you're also experiencing fever, it could be a sign of infection. I recommend staying hydrated, resting, and taking over-the-counter pain relievers if appropriate. If symptoms persist for more than 48 hours or are severe, please consult a healthcare professional.";
    } else if (symptoms.toLowerCase().includes('cough')) {
      return 'A cough could be due to a common cold, allergies, or respiratory infection. Stay hydrated, consider using honey for soothing (if not contraindicated), and monitor for fever or difficulty breathing. If symptoms worsen or persist beyond a week, consult a healthcare provider.';
    } else {
      return 'Based on the limited information provided, I recommend monitoring your symptoms and resting. If symptoms worsen or persist for more than a few days, please consult a healthcare professional for proper diagnosis and treatment.';
    }
  },

  mockCheckDrugInteractions(medications: string[]): DrugInteraction[] {
    // Mock interactions for common medications
    const knownInteractions: Record<string, Record<string, Omit<DrugInteraction, 'medications'>>> = {
      'warfarin': {
        'aspirin': {
          severity: 'high',
          description: 'Increased risk of bleeding when used together',
          recommendation: 'Avoid concurrent use if possible. Monitor closely for signs of bleeding.'
        },
        'ibuprofen': {
          severity: 'high',
          description: 'Increased risk of gastrointestinal bleeding',
          recommendation: 'Avoid concurrent use if possible. Consider alternative pain relievers.'
        }
      },
      'lisinopril': {
        'potassium supplements': {
          severity: 'medium',
          description: 'May cause hyperkalemia (high potassium levels)',
          recommendation: 'Monitor potassium levels regularly.'
        },
        'spironolactone': {
          severity: 'medium',
          description: 'Increased risk of hyperkalemia',
          recommendation: 'Monitor potassium levels and renal function.'
        }
      }
    };

    const results = [];
    
    // Check each medication pair for interactions
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const med1 = medications[i].toLowerCase();
        const med2 = medications[j].toLowerCase();
        
        // Check if interaction exists in either direction
        if (knownInteractions[med1]?.[med2]) {
          results.push({
            medications: [medications[i], medications[j]],
            ...knownInteractions[med1][med2]
          });
        } else if (knownInteractions[med2]?.[med1]) {
          results.push({
            medications: [medications[i], medications[j]],
            ...knownInteractions[med2][med1]
          });
        }
      }
    }
    
    return results;
  }
};