import { Router, Request } from 'express';
const { body } = require('express-validator');
import { register, login, getMe } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Register validation rules
const registerValidation = [
  body('username').optional().notEmpty().withMessage('Username is required'),
  body('fullName').optional().notEmpty().withMessage('Full name is required'),
  body().custom((value: unknown, { req }: { req: Request }) => {
    if (!req.body.username && !req.body.fullName) {
      throw new Error('Either username or full name is required');
    }
    return true;
  }),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('team')
    .isIn([
      'Design and Social Media',
      'Publicity',
      'Event Management',
      'Documentation',
      'Coverage',
      'Technical',
    ])
    .withMessage('Valid team is required'),
];

// Login validation rules
const loginValidation = [
  body('username').optional().notEmpty().withMessage('Username is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body().custom((value: unknown, { req }: { req: Request }) => {
    if (!req.body.username && !req.body.email) {
      throw new Error('Either username or email is required');
    }
    return true;
  }),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', authMiddleware, getMe);

export default router;
