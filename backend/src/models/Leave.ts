import mongoose, { Schema, Document } from 'mongoose';

export interface ILeave extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  team: string;
  leaveType: string;
  reason: string;
  startDate: Date;
  endDate: Date;
  numberOfDays: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  appliedAt: Date;
  updatedAt: Date;
}

const leaveSchema = new Schema<ILeave>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    leaveType: {
      type: String,
      enum: ['Sick Leave', 'Personal Leave', 'Casual Leave', 'Other'],
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
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

export default mongoose.model<ILeave>('Leave', leaveSchema);
