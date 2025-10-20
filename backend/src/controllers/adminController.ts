import UserRole from '../models/UserRole';
import User from '../models/User';
import Team from '../models/Team';
import { Request, Response } from 'express';

// Create User Role
export const createUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role, canAccessTeams, teamLead } = req.body;

    const existingRole = await UserRole.findOne({ userId });
    if (existingRole) {
      return res.status(400).json({ message: 'User role already exists' });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRole = new UserRole({
      userId,
      userName: user.name,
      team: user.team,
      role,
      canAccessTeams: canAccessTeams || [],
      teamLead: teamLead || false,
    });

    await userRole.save();
    res.status(201).json({ message: 'User role created successfully', userRole });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user role', error });
  }
};

// Update User Role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;
    const { role, canAccessTeams, teamLead } = req.body;

    const userRole = await UserRole.findByIdAndUpdate(
      roleId,
      {
        role,
        canAccessTeams,
        teamLead,
      },
      { new: true }
    );

    if (!userRole) {
      return res.status(404).json({ message: 'User role not found' });
    }

    res.status(200).json({ message: 'User role updated successfully', userRole });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const role = await UserRole.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          role: role || null,
        };
      })
    );

    res.status(200).json({ users: usersWithRoles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get Team Members
export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const { team } = req.params;

    const users = await User.find({ team }).select('-password');
    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const role = await UserRole.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          role: role || null,
        };
      })
    );

    res.status(200).json({ team, members: usersWithRoles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error });
  }
};

// Assign User to Team
export const assignUserToTeam = async (req: Request, res: Response) => {
  try {
    const { userId, team } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { team },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User assigned to team successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning user to team', error });
  }
};

// Deactivate User
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deactivated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error });
  }
};

// Activate User
export const activateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User activated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error activating user', error });
  }
};

// Get Team Statistics
export const getTeamStats = async (req: Request, res: Response) => {
  try {
    const teams = [
      'Design and Social Media',
      'Publicity',
      'Event Management',
      'Documentation',
      'Coverage',
      'Technical',
    ];

    const stats = await Promise.all(
      teams.map(async (team) => {
        const members = await User.countDocuments({ team, isActive: true });
        return { team, memberCount: members };
      })
    );

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team stats', error });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Also delete associated role
    await UserRole.deleteOne({ userId });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
