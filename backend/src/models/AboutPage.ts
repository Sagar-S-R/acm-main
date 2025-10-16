import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutPage extends Document {
  section: string;
  content: string;
  imageUrl?: string;
  order: number;
  updatedBy: string; // User ID from Documentation team
  createdAt: Date;
  updatedAt: Date;
}

const aboutPageSchema = new Schema<IAboutPage>(
  {
    section: {
      type: String,
      required: [true, 'Section name is required'],
      unique: true,
      enum: ['mission', 'vision', 'about', 'team', 'achievements'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    order: {
      type: Number,
      default: 1,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAboutPage>('AboutPage', aboutPageSchema);
