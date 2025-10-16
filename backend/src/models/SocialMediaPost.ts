import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialMediaPost extends Document {
  title: string;
  content: string;
  eventId?: string;
  eventName?: string;
  platforms: string[]; // 'instagram', 'facebook', 'linkedin', 'twitter', etc.
  imageUrl?: string;
  scheduledDate?: Date;
  isPosted: boolean;
  postedDate?: Date;
  postedBy: string; // User ID from Social Media team
  links?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const socialMediaPostSchema = new Schema<ISocialMediaPost>(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
    },
    eventId: {
      type: String,
      default: null,
    },
    eventName: {
      type: String,
      trim: true,
    },
    platforms: [
      {
        type: String,
        enum: ['instagram', 'facebook', 'linkedin', 'twitter', 'youtube', 'telegram', 'discord'],
      },
    ],
    imageUrl: {
      type: String,
      default: null,
    },
    scheduledDate: {
      type: Date,
      default: null,
    },
    isPosted: {
      type: Boolean,
      default: false,
    },
    postedDate: {
      type: Date,
      default: null,
    },
    postedBy: {
      type: String,
      required: true,
    },
    links: {
      instagram: String,
      facebook: String,
      linkedin: String,
      twitter: String,
      youtube: String,
    },
    engagement: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISocialMediaPost>('SocialMediaPost', socialMediaPostSchema);
