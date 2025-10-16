import { Router } from 'express';
const { body } = require('express-validator');
import {
  uploadPoster,
  getMyPosters,
  getDesignTeamGallery,
  getPublicPosters,
  updatePoster,
  deletePoster,
  approvePoster,
} from '../controllers/designController';
import { authMiddleware } from '../middleware/auth';
import { requireTeam, requireRole } from '../middleware/roleCheck';

const router = Router();

// Validation rules
const posterValidation = [
  body('title').notEmpty().withMessage('Poster title is required'),
  body('imageUrl').isURL().withMessage('Valid image URL is required'),
];

// Upload Poster
router.post('/', authMiddleware, requireTeam(['Design and Social Media']), posterValidation, uploadPoster);

// Get My Posters (Private Gallery)
router.get('/my-gallery', authMiddleware, requireTeam(['Design and Social Media']), getMyPosters);

// Get Design Team Gallery (All team posters)
router.get('/team-gallery', authMiddleware, requireTeam(['Design and Social Media']), getDesignTeamGallery);

// Get Public Posters (Approved posters)
router.get('/public', getPublicPosters);

// Update Poster
router.put('/:posterId', authMiddleware, requireTeam(['Design and Social Media']), updatePoster);

// Delete Poster
router.delete('/:posterId', authMiddleware, requireTeam(['Design and Social Media']), deletePoster);

// Approve Poster (Admin/Technical Only)
router.put('/:posterId/approve', authMiddleware, requireRole(['admin', 'technical']), approvePoster);

export default router;
