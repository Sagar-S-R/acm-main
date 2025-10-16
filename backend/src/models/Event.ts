import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  speakers?: string[];
  attendees?: number;
  status: 'upcoming' | 'completed';
  createdBy: string; // User ID from Documentation team
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    speakers: [
      {
        type: String,
        trim: true,
      },
    ],
    attendees: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed'],
      default: 'upcoming',
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>('Event', eventSchema);
