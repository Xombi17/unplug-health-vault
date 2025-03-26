import { createWorker } from 'tesseract.js';
import * as pdfParse from 'pdf-parse';
import sharp from 'sharp';
import { IVaccine } from '../models/Vaccine';

export class OCRService {
  private static instance: OCRService;
  private worker: Tesseract.Worker | null = null;

  private constructor() {}

  public static getInstance(): OCRService {
    if (!OCRService.instance) {
      OCRService.instance = new OCRService();
    }
    return OCRService.instance;
  }

  private async initializeWorker() {
    if (!this.worker) {
      this.worker = await createWorker('eng');
    }
  }

  private async cleanupWorker() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }

  private async processImage(buffer: Buffer): Promise<string> {
    await this.initializeWorker();
    if (!this.worker) throw new Error('OCR worker not initialized');

    // Optimize image for OCR
    const optimizedImage = await sharp(buffer)
      .resize(2000, 2000, { fit: 'inside' })
      .normalize()
      .toBuffer();

    const { data: { text } } = await this.worker.recognize(optimizedImage);
    return text;
  }

  private async processPDF(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text;
  }

  private extractVaccineInfo(text: string): Partial<IVaccine> {
    // Common vaccine name patterns
    const vaccinePatterns = [
      /(?:vaccine|immunization|shot)\s*:\s*([A-Za-z\s-]+)/i,
      /([A-Za-z\s-]+)\s*(?:vaccine|immunization|shot)/i
    ];

    // Date patterns
    const datePatterns = [
      /(?:date|administered|given)\s*:\s*(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/
    ];

    // Provider patterns
    const providerPatterns = [
      /(?:provider|doctor|clinic)\s*:\s*([A-Za-z\s-]+)/i,
      /([A-Za-z\s-]+)\s*(?:hospital|clinic|center)/i
    ];

    // Batch number patterns
    const batchPatterns = [
      /(?:batch|lot|serial)\s*(?:number|no\.?)\s*:\s*([A-Z0-9-]+)/i,
      /([A-Z0-9-]+)\s*(?:batch|lot|serial)/i
    ];

    // Extract vaccine name
    let vaccineName = '';
    for (const pattern of vaccinePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        vaccineName = match[1].trim();
        break;
      }
    }

    // Extract date
    let date = '';
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        date = match[1];
        break;
      }
    }

    // Extract provider
    let provider = '';
    for (const pattern of providerPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        provider = match[1].trim();
        break;
      }
    }

    // Extract batch number
    let batchNumber = '';
    for (const pattern of batchPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        batchNumber = match[1].trim();
        break;
      }
    }

    return {
      name: vaccineName,
      date: date ? new Date(date) : undefined,
      provider,
      batchNumber
    };
  }

  public async processCertificate(buffer: Buffer, fileType: string): Promise<Partial<IVaccine>> {
    try {
      let text = '';
      
      if (fileType === 'application/pdf') {
        text = await this.processPDF(buffer);
      } else {
        text = await this.processImage(buffer);
      }

      const vaccineInfo = this.extractVaccineInfo(text);
      
      // Validate extracted information
      if (!vaccineInfo.name) {
        throw new Error('Could not extract vaccine name from certificate');
      }

      if (!vaccineInfo.date) {
        throw new Error('Could not extract vaccine date from certificate');
      }

      return vaccineInfo;
    } finally {
      await this.cleanupWorker();
    }
  }
} 