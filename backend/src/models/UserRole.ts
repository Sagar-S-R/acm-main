import mongoose, { Schema, Document } from 'mongoose';

export interface IUserRole extends Document {
  userId: string;
  userName: string;
  team: string;
  role: 'member' | 'lead' | 'admin' | 'technical';
  permissions: string[];
  canAccessTeams: string[]; // Teams this user can access
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userRoleSchema = new Schema<IUserRole>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      enum: [
        'Design and Social Media',
        'Publicity',
        'Event Management',
        'Documentation',
        'Coverage',
        'Technical',
      ],
      required: true,
    },
    role: {
      type: String,
      enum: ['member', 'lead', 'admin', 'technical'],
      default: 'member',
    },
    permissions: [
      {
        type: String,
      },
    ],
    canAccessTeams: [
      {
        type: String,
        enum: [
          'Design and Social Media',
          'Publicity',
          'Event Management',
          'Documentation',
          'Coverage',
          'Technical',
        ],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserRole>('UserRole', userRoleSchema);
