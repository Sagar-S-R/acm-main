import { Router } from 'express';
const { body } = require('express-validator');
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  markEventCompleted,
} from '../controllers/eventController';
import {
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
  updateAboutSection,
  getAboutPage,
  getAboutSection,
  deleteAboutSection,
} from '../controllers/documentationController';
import { authMiddleware } from '../middleware/auth';
import { requireTeam } from '../middleware/roleCheck';

const router = Router();

// Validation rules
const eventValidation = [
  body('title').notEmpty().withMessage('Event title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('location').notEmpty().withMessage('Location is required'),
];

const resourceValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('url').isURL().withMessage('Valid URL is required'),
];

const aboutSectionValidation = [
  body('section').isIn(['mission', 'vision', 'about', 'team', 'achievements']).withMessage('Invalid section'),
  body('content').notEmpty().withMessage('Content is required'),
];

// Events Routes (Documentation and Event Management teams can manage events)
router.post('/events', authMiddleware, requireTeam(['Documentation', 'Event Management']), eventValidation, createEvent);
router.get('/events', getAllEvents);
router.get('/events/:eventId', getEventById);
router.put('/events/:eventId', authMiddleware, requireTeam(['Documentation', 'Event Management']), updateEvent);
router.delete('/events/:eventId', authMiddleware, requireTeam(['Documentation', 'Event Management']), deleteEvent);
router.put('/events/:eventId/completed', authMiddleware, requireTeam(['Documentation', 'Event Management']), markEventCompleted);

// Resources Routes
router.post('/resources', authMiddleware, requireTeam(['Documentation']), resourceValidation, createResource);
router.get('/resources', getAllResources);
router.put('/resources/:resourceId', authMiddleware, requireTeam(['Documentation']), updateResource);
router.delete('/resources/:resourceId', authMiddleware, requireTeam(['Documentation']), deleteResource);

// About Page Routes
router.put('/about/:section', authMiddleware, requireTeam(['Documentation']), aboutSectionValidation, updateAboutSection);
router.get('/about', getAboutPage);
router.get('/about/:section', getAboutSection);
router.delete('/about/:section', authMiddleware, requireTeam(['Documentation']), deleteAboutSection);

export default router;
