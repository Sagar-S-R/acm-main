import mongoose, { Schema, Document } from 'mongoose';

export interface IPoster extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  eventId?: string; // Reference to event if for specific event
  eventName?: string;
  designedBy: string; // User ID from Design team
  visibility: 'public' | 'private'; // public for all, private for design team only
  isApproved: boolean;
  approvedBy?: string; // Admin/Technical team approval
  createdAt: Date;
  updatedAt: Date;
}

const posterSchema = new Schema<IPoster>(
  {
    title: {
      type: String,
      required: [true, 'Poster title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Poster image URL is required'],
    },
    eventId: {
      type: String,
      default: null,
    },
    eventName: {
      type: String,
      trim: true,
    },
    designedBy: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPoster>('Poster', posterSchema);
