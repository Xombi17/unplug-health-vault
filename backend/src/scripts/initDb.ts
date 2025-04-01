import { connectDB } from '../config/database';
import { Vaccine } from '../models/Vaccine';
import dotenv from 'dotenv';

dotenv.config();

const sampleVaccines = [
  {
    userId: 'sample-user-1',
    name: 'COVID-19',
    date: new Date('2023-11-15'),
    status: 'completed',
    provider: 'City Hospital',
    batchNumber: 'COV-2023-001'
  },
  {
    userId: 'sample-user-1',
    name: 'Tetanus',
    date: new Date('2022-05-20'),
    status: 'completed',
    provider: 'Community Clinic',
    batchNumber: 'TET-2022-002'
  },
  {
    userId: 'sample-user-1',
    name: 'Flu Shot',
    date: new Date('2024-01-10'),
    status: 'completed',
    provider: 'Local Pharmacy',
    batchNumber: 'FLU-2024-001'
  }
];

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    await Vaccine.deleteMany({});

    // Insert sample data
    await Vaccine.insertMany(sampleVaccines);

    console.log('Database initialized with sample data');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase(); 