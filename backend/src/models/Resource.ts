import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  url: string;
  category: string;
  type: string; // 'link', 'document', 'video', etc.
  uploadedBy: string; // User ID from Documentation team
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Resource URL is required'],
    },
    category: {
      type: String,
      enum: ['Tutorials', 'Documentation', 'Tools', 'Articles', 'Videos', 'Other'],
      default: 'Other',
    },
    type: {
      type: String,
      enum: ['link', 'document', 'video', 'code', 'other'],
      default: 'link',
    },
    uploadedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResource>('Resource', resourceSchema);
