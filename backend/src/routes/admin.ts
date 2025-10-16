import { Router } from 'express';
const { body } = require('express-validator');
import {
  createUserRole,
  updateUserRole,
  getAllUsers,
  getTeamMembers,
  assignUserToTeam,
  deactivateUser,
  activateUser,
  getTeamStats,
  deleteUser,
} from '../controllers/adminController';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/roleCheck';

const router = Router();

// All admin routes require admin role
router.use(authMiddleware, requireRole(['admin']));

// User Role Management
router.post('/roles/create', createUserRole);
router.put('/roles/:roleId', updateUserRole);

// User Management
router.get('/users', getAllUsers);
router.get('/users/:team', getTeamMembers);
router.post('/users/assign-team', assignUserToTeam);
router.put('/users/:userId/deactivate', deactivateUser);
router.put('/users/:userId/activate', activateUser);
router.delete('/users/:userId', deleteUser);

// Team Statistics
router.get('/stats/teams', getTeamStats);

export default router;
