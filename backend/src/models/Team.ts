import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  head?: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
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
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    head: {
      type: String,
      default: null,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITeam>('Team', teamSchema);
