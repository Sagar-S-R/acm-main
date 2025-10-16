import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userTeam?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

    if (decoded && typeof decoded === 'object') {
      req.userId = decoded.userId;
      req.userTeam = decoded.team;
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
