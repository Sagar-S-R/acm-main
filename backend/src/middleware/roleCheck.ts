import { Request, Response, NextFunction } from 'express';
import UserRole from '../models/UserRole';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userTeam?: string;
      userRole?: string;
      canAccessTeam?: (team: string) => Promise<boolean>;
    }
  }
}

export const roleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = await UserRole.findOne({ userId });

    if (!userRole) {
      return res.status(403).json({ message: 'User role not configured' });
    }

    req.userRole = userRole.role;

    // Add helper method to check team access
    req.canAccessTeam = async (team: string) => {
      if (userRole.role === 'admin') return true; // Admin can access all
      if (userRole.role === 'technical') return true; // Technical team can access all
      if (userRole.team === team) return true; // Own team member
      return userRole.canAccessTeams.includes(team);
    };

    next();
  } catch (error) {
    console.error('Role middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const requireTeam = (allowedTeams: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const userRole = await UserRole.findOne({ userId });

      if (!userRole) {
        return res.status(403).json({ message: 'User role not configured' });
      }

      // Check if user is in allowed teams or is admin/technical
      const hasAccess =
        userRole.role === 'admin' ||
        userRole.role === 'technical' ||
        allowedTeams.includes(userRole.team);

      if (!hasAccess) {
        return res.status(403).json({ message: 'Access denied. You do not have permission for this resource.' });
      }

      req.userRole = userRole.role;
      next();
    } catch (error) {
      console.error('Require team error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

export const requireRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const userRole = await UserRole.findOne({ userId });

      // Technical and admin should be allowed to access admin routes
      const effectiveRoles = [...roles];
      if (!effectiveRoles.includes('admin')) {
        effectiveRoles.push('admin');
      }
      if (!effectiveRoles.includes('technical')) {
        effectiveRoles.push('technical');
      }

      if (!userRole || !effectiveRoles.includes(userRole.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      req.userRole = userRole.role;
      next();
    } catch (error) {
      console.error('Require role error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
