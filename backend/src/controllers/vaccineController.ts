import { Request, Response } from 'express';
import { Vaccine } from '../models/Vaccine';
import { OCRService } from '../services/ocrService';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/certificates';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
    }
  }
});

export class VaccineController {
  private static instance: VaccineController;
  private ocrService: OCRService;

  private constructor() {
    this.ocrService = OCRService.getInstance();
  }

  public static getInstance(): VaccineController {
    if (!VaccineController.instance) {
      VaccineController.instance = new VaccineController();
    }
    return VaccineController.instance;
  }

  public uploadMiddleware = upload.single('certificate');

  public async processCertificate(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileBuffer = fs.readFileSync(req.file.path);
      const vaccineInfo = await this.ocrService.processCertificate(fileBuffer, req.file.mimetype);

      // Create new vaccine record
      const vaccine = new Vaccine({
        userId: req.user?.id, // Assuming user ID is added by auth middleware
        ...vaccineInfo,
        certificate: req.file.path,
        status: 'completed'
      });

      await vaccine.save();

      // Clean up the uploaded file after processing
      fs.unlinkSync(req.file.path);

      res.status(201).json(vaccine);
    } catch (error) {
      console.error('Error processing certificate:', error);
      res.status(500).json({ error: 'Failed to process vaccine certificate' });
    }
  }

  public async getVaccineHistory(req: Request, res: Response) {
    try {
      const vaccines = await Vaccine.find({ userId: req.user?.id })
        .sort({ date: -1 });
      res.json(vaccines);
    } catch (error) {
      console.error('Error fetching vaccine history:', error);
      res.status(500).json({ error: 'Failed to fetch vaccine history' });
    }
  }

  public async getVaccineRecommendations(req: Request, res: Response) {
    try {
      const vaccines = await Vaccine.find({ userId: req.user?.id });
      
      // Get user's age (you would need to implement this based on your user model)
      const userAge = 30; // Example age

      // Define vaccine schedule based on age
      const recommendations = this.generateRecommendations(vaccines, userAge);
      
      res.json(recommendations);
    } catch (error) {
      console.error('Error generating vaccine recommendations:', error);
      res.status(500).json({ error: 'Failed to generate vaccine recommendations' });
    }
  }

  private generateRecommendations(vaccines: any[], userAge: number) {
    const recommendations = [];
    const today = new Date();

    // Define standard vaccine schedule
    const vaccineSchedule = [
      {
        name: 'Tetanus',
        description: 'Tetanus booster shot',
        dueAge: 30,
        interval: 10, // years
        importance: 'high' as const
      },
      {
        name: 'Flu Shot',
        description: 'Annual influenza vaccine',
        dueAge: 0,
        interval: 1, // year
        importance: 'medium' as const
      },
      {
        name: 'Pneumonia',
        description: 'Pneumococcal vaccine',
        dueAge: 65,
        interval: 5, // years
        importance: 'medium' as const
      }
    ];

    for (const schedule of vaccineSchedule) {
      const lastVaccine = vaccines.find(v => v.name.toLowerCase().includes(schedule.name.toLowerCase()));
      
      if (!lastVaccine) {
        // If never taken and age requirement met
        if (userAge >= schedule.dueAge) {
          recommendations.push({
            name: schedule.name,
            description: schedule.description,
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30), // Due in 30 days
            importance: schedule.importance
          });
        }
      } else {
        const lastDate = new Date(lastVaccine.date);
        const yearsSinceLastVaccine = (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        
        if (yearsSinceLastVaccine >= schedule.interval) {
          recommendations.push({
            name: schedule.name,
            description: schedule.description,
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30), // Due in 30 days
            importance: schedule.importance
          });
        }
      }
    }

    return recommendations;
  }
} 