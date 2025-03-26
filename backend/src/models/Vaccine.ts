import mongoose, { Schema, Document } from 'mongoose';

export interface IVaccine extends Document {
  userId: string;
  name: string;
  date: Date;
  status: 'completed' | 'pending' | 'overdue';
  certificate?: string;
  nextDueDate?: Date;
  provider?: string;
  batchNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VaccineSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'overdue'],
    required: true
  },
  certificate: {
    type: String,
    required: false
  },
  nextDueDate: {
    type: Date,
    required: false
  },
  provider: {
    type: String,
    required: false
  },
  batchNumber: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
VaccineSchema.index({ userId: 1, date: -1 });
VaccineSchema.index({ userId: 1, status: 1 });

export const Vaccine = mongoose.model<IVaccine>('Vaccine', VaccineSchema); 