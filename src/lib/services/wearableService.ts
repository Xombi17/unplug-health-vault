import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
  deviceId: string;
}

interface SyncRequest {
  deviceId: string;
  authToken?: string;
}

interface DeviceAuthData {
  token?: string;
  refreshToken?: string;
  expiresAt?: Date;
  scopes?: string[];
  [key: string]: string | number | boolean | Date | string[] | undefined; // For any additional auth data specific to device types
}

export const wearableService = {
  async getConnectedDevices(): Promise<WearableDevice[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/wearables/devices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching connected devices:', error);
      throw new Error('Failed to fetch connected devices');
    }
  },

  async connectDevice(deviceId: string, authData: DeviceAuthData): Promise<WearableDevice> {
    try {
      const response = await axios.post(`${API_BASE_URL}/wearables/connect`, {
        deviceId,
        authData,
      });
      return response.data;
    } catch (error) {
      console.error('Error connecting device:', error);
      throw new Error('Failed to connect device');
    }
  },

  async disconnectDevice(deviceId: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/wearables/disconnect`, { deviceId });
    } catch (error) {
      console.error('Error disconnecting device:', error);
      throw new Error('Failed to disconnect device');
    }
  },

  async syncDeviceData(request: SyncRequest): Promise<HealthMetric[]> {
    try {
      const response = await axios.post(`${API_BASE_URL}/wearables/sync`, request);
      return response.data;
    } catch (error) {
      console.error('Error syncing device data:', error);
      throw new Error('Failed to sync device data');
    }
  },

  async getHealthMetrics(metricType: string, timeframe: string): Promise<HealthMetric[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/wearables/metrics`, {
        params: { type: metricType, timeframe },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching health metrics:', error);
      throw new Error('Failed to fetch health metrics');
    }
  },

  // Mock functions for development/testing
  mockGetConnectedDevices(): WearableDevice[] {
    return [
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
  },

  mockGetHealthMetrics(metricType: string, timeframe: string): HealthMetric[] {
    // Generate mock data based on metric type and timeframe
    const result: HealthMetric[] = [];
    const now = new Date();
    
    // Number of data points to generate based on timeframe
    let dataPoints = 24; // default for 'day'
    let intervalMs = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (timeframe === 'week') {
      dataPoints = 7;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day
    } else if (timeframe === 'month') {
      dataPoints = 30;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day
    }
    
    // Generate random values based on metric type
    for (let i = 0; i < dataPoints; i++) {
      const timestamp = new Date(now.getTime() - (dataPoints - i) * intervalMs);
      let value: number;
      let unit: string;
      
      switch (metricType) {
        case 'heart_rate':
          value = 60 + Math.floor(Math.random() * 30); // 60-90 bpm
          unit = 'bpm';
          break;
        case 'steps':
          value = Math.floor(Math.random() * 1000) + 500; // 500-1500 steps
          unit = 'steps';
          break;
        case 'blood_glucose':
          value = 80 + Math.floor(Math.random() * 60); // 80-140 mg/dL
          unit = 'mg/dL';
          break;
        case 'sleep':
          value = 5 + Math.random() * 4; // 5-9 hours
          unit = 'hours';
          break;
        default:
          value = Math.random() * 100;
          unit = 'units';
      }
      
      result.push({
        id: `metric-${i}`,
        type: metricType,
        value,
        unit,
        timestamp,
        deviceId: '1', // Assuming from Apple Watch
      });
    }
    
    return result;
  },
};