import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  emergency24h: boolean;
  icuAvailable: boolean;
  waitTime?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  notifyInEmergency: boolean;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: Date;
}

interface EmergencyInfo {
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  medications?: string[];
  emergencyContacts: EmergencyContact[];
}

export const emergencyService = {
  async getNearbyHospitals(location: UserLocation): Promise<Hospital[]> {
    try {
      const response = await axios.post(`${API_BASE_URL}/emergency/hospitals`, location);
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby hospitals:', error);
      throw new Error('Failed to fetch nearby hospitals');
    }
  },

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/emergency/contacts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
      throw new Error('Failed to fetch emergency contacts');
    }
  },

  async addEmergencyContact(contact: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> {
    try {
      const response = await axios.post(`${API_BASE_URL}/emergency/contacts`, contact);
      return response.data;
    } catch (error) {
      console.error('Error adding emergency contact:', error);
      throw new Error('Failed to add emergency contact');
    }
  },

  async updateEmergencyContact(contact: EmergencyContact): Promise<EmergencyContact> {
    try {
      const response = await axios.put(`${API_BASE_URL}/emergency/contacts/${contact.id}`, contact);
      return response.data;
    } catch (error) {
      console.error('Error updating emergency contact:', error);
      throw new Error('Failed to update emergency contact');
    }
  },

  async deleteEmergencyContact(contactId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/emergency/contacts/${contactId}`);
    } catch (error) {
      console.error('Error deleting emergency contact:', error);
      throw new Error('Failed to delete emergency contact');
    }
  },

  async getEmergencyInfo(): Promise<EmergencyInfo> {
    try {
      const response = await axios.get(`${API_BASE_URL}/emergency/info`);
      return response.data;
    } catch (error) {
      console.error('Error fetching emergency info:', error);
      throw new Error('Failed to fetch emergency info');
    }
  },

  async updateEmergencyInfo(info: Partial<EmergencyInfo>): Promise<EmergencyInfo> {
    try {
      const response = await axios.put(`${API_BASE_URL}/emergency/info`, info);
      return response.data;
    } catch (error) {
      console.error('Error updating emergency info:', error);
      throw new Error('Failed to update emergency info');
    }
  },

  async triggerSOS(location: UserLocation): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/emergency/sos`, { location });
      return response.data;
    } catch (error) {
      console.error('Error triggering SOS:', error);
      throw new Error('Failed to trigger SOS alert');
    }
  },

  // Mock functions for development/testing
  mockGetNearbyHospitals(): Hospital[] {
    return [
      {
        id: '1',
        name: 'City General Hospital',
        distance: '2.3 miles',
        address: '123 Medical Center Blvd, City Center',
        phone: '(555) 123-4567',
        emergency24h: true,
        icuAvailable: true,
        waitTime: '15-20 min',
        location: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      },
      {
        id: '2',
        name: 'Memorial Medical Center',
        distance: '3.8 miles',
        address: '456 Healthcare Ave, Westside',
        phone: '(555) 987-6543',
        emergency24h: true,
        icuAvailable: true,
        waitTime: '30-45 min',
        location: {
          latitude: 37.7749,
          longitude: -122.4294,
        },
      },
      {
        id: '3',
        name: 'Riverside Community Hospital',
        distance: '5.2 miles',
        address: '789 Riverside Dr, Eastside',
        phone: '(555) 456-7890',
        emergency24h: true,
        icuAvailable: false,
        waitTime: '10-15 min',
        location: {
          latitude: 37.7849,
          longitude: -122.4094,
        },
      },
    ];
  },

  mockGetEmergencyContacts(): EmergencyContact[] {
    return [
      {
        id: '1',
        name: 'John Smith',
        phone: '(555) 123-4567',
        relationship: 'Spouse',
        notifyInEmergency: true,
      },
      {
        id: '2',
        name: 'Mary Johnson',
        phone: '(555) 987-6543',
        relationship: 'Parent',
        notifyInEmergency: true,
      },
    ];
  },

  mockGetEmergencyInfo(): EmergencyInfo {
    return {
      bloodType: 'A+',
      allergies: ['Penicillin', 'Peanuts'],
      medicalConditions: ['Asthma', 'Hypertension'],
      medications: ['Albuterol', 'Lisinopril'],
      emergencyContacts: this.mockGetEmergencyContacts(),
    };
  },

  mockTriggerSOS(): { success: boolean; message: string } {
    return {
      success: true,
      message: 'SOS alert sent to emergency contacts',
    };
  },
};