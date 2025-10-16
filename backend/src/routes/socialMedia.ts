import { Router } from 'express';
const { body } = require('express-validator');
import {
  createPost,
  getMyPosts,
  getTeamPosts,
  getPostsByEvent,
  updatePost,
  markAsPosted,
  updateEngagement,
  deletePost,
} from '../controllers/socialMediaController';
import { authMiddleware } from '../middleware/auth';
import { requireTeam } from '../middleware/roleCheck';

const router = Router();

// Validation rules
const postValidation = [
  body('title').notEmpty().withMessage('Post title is required'),
  body('content').notEmpty().withMessage('Post content is required'),
  body('platforms').isArray().withMessage('Platforms must be an array'),
];

// Create Post
router.post('/', authMiddleware, requireTeam(['Design and Social Media']), postValidation, createPost);

// Get My Posts
router.get('/my-posts', authMiddleware, requireTeam(['Design and Social Media']), getMyPosts);

// Get Team Posts
router.get('/team-posts', authMiddleware, requireTeam(['Design and Social Media']), getTeamPosts);

// Get Posts by Event
router.get('/event/:eventId', getPostsByEvent);

// Update Post
router.put('/:postId', authMiddleware, requireTeam(['Design and Social Media']), updatePost);

// Mark Post as Posted
router.put('/:postId/posted', authMiddleware, requireTeam(['Design and Social Media']), markAsPosted);

// Update Engagement
router.put('/:postId/engagement', authMiddleware, requireTeam(['Design and Social Media']), updateEngagement);

// Delete Post
router.delete('/:postId', authMiddleware, requireTeam(['Design and Social Media']), deletePost);

export default router;
