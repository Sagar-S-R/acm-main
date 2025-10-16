import { Router } from 'express';
import Team from '../models/Team';
import User from '../models/User';
import UserRole from '../models/UserRole';
import { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get All Teams
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

// Get Team Details
router.get('/:teamName', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { teamName } = req.params;
    const team = await Team.findOne({ name: teamName });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

  // Include users with the exact team match
  const members = await User.find({ team: teamName }).select('-password');
    const teamDetails = await Promise.all(
      members.map(async (member) => {
        const role = await UserRole.findOne({ userId: member._id });
        return {
          ...member.toObject(),
          role: role?.role || 'member',
        };
      })
    );

    res.status(200).json({
      team,
      members: teamDetails,
      memberCount: teamDetails.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team details', error });
  }
});

// Get Team Members
router.get('/:teamName/members', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { teamName } = req.params;
    const members = await User.find({ team: teamName }).select('-password');

    const memberDetails = await Promise.all(
      members.map(async (member) => {
        const role = await UserRole.findOne({ userId: member._id });
        return {
          ...member.toObject(),
          role: role?.role || 'member',
          isLead: role?.role === 'lead',
        };
      })
    );

    res.status(200).json({
      team: teamName,
      members: memberDetails,
      count: memberDetails.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error });
  }
});

// Get Team Statistics
router.get('/:teamName/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { teamName } = req.params;
    const totalMembers = await User.countDocuments({ team: teamName, isActive: true });
    const leads = await UserRole.countDocuments({ teamLead: true });

    res.status(200).json({
      team: teamName,
      totalMembers,
      teamLeads: leads,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team stats', error });
  }
});

export default router;
