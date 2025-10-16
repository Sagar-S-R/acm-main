import { Router } from 'express';
const { body } = require('express-validator');
import {
  applyLeave,
  getMyLeaves,
  getTeamLeaves,
  updateLeaveStatus,
} from '../controllers/leaveController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Apply leave validation
const applyLeaveValidation = [
  body('leaveType')
    .isIn(['Sick Leave', 'Personal Leave', 'Casual Leave', 'Other'])
    .withMessage('Valid leave type is required'),
  body('reason').notEmpty().withMessage('Reason is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
];

// Update leave status validation
const updateLeaveStatusValidation = [
  body('status')
    .isIn(['Approved', 'Rejected', 'Pending'])
    .withMessage('Valid status is required'),
];

// Apply leave
router.post('/apply', authMiddleware, applyLeaveValidation, applyLeave);

// Get my leaves
router.get('/my-leaves', authMiddleware, getMyLeaves);

// Get team leaves
router.get('/team-leaves', authMiddleware, getTeamLeaves);

// Update leave status
router.put('/:leaveId/status', authMiddleware, updateLeaveStatusValidation, updateLeaveStatus);

export default router;
