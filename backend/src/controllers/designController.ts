import { Request, Response } from 'express';
import Poster from '../models/Poster';
const { validationResult } = require('express-validator');

// Upload Poster
export const uploadPoster = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { title, description, imageUrl, eventId, eventName, visibility } = req.body;

    const poster = new Poster({
      title,
      description,
      imageUrl,
      eventId: eventId || null,
      eventName,
      designedBy: userId,
      visibility: visibility || 'private',
      isApproved: false,
    });

    await poster.save();

    res.status(201).json({
      message: 'Poster uploaded successfully',
      poster,
    });
  } catch (error) {
    console.error('Upload poster error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get My Posters (Private Gallery)
export const getMyPosters = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const posters = await Poster.find({ designedBy: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      total: posters.length,
      posters,
    });
  } catch (error) {
    console.error('Get my posters error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Design Team Gallery (All team posters - private)
export const getDesignTeamGallery = async (req: Request, res: Response) => {
  try {
    // This endpoint should only be accessible to Design team members
    const posters = await Poster.find({ visibility: 'private' }).sort({ createdAt: -1 });

    res.status(200).json({
      total: posters.length,
      posters,
    });
  } catch (error) {
    console.error('Get design team gallery error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Public Posters (Approved posters for upcoming events)
export const getPublicPosters = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.query;

    let filter: any = { visibility: 'public', isApproved: true };
    if (eventId) {
      filter.eventId = eventId;
    }

    const posters = await Poster.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      total: posters.length,
      posters,
    });
  } catch (error) {
    console.error('Get public posters error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Poster
export const updatePoster = async (req: Request, res: Response) => {
  try {
    const { posterId } = req.params;
    const userId = req.userId;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    if (poster.designedBy !== userId) {
      return res.status(403).json({ message: 'You can only edit your own posters' });
    }

    const updatedPoster = await Poster.findByIdAndUpdate(posterId, req.body, { new: true });

    res.status(200).json({
      message: 'Poster updated successfully',
      poster: updatedPoster,
    });
  } catch (error) {
    console.error('Update poster error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Poster
export const deletePoster = async (req: Request, res: Response) => {
  try {
    const { posterId } = req.params;
    const userId = req.userId;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    if (poster.designedBy !== userId) {
      return res.status(403).json({ message: 'You can only delete your own posters' });
    }

    await Poster.findByIdAndDelete(posterId);

    res.status(200).json({
      message: 'Poster deleted successfully',
    });
  } catch (error) {
    console.error('Delete poster error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Approve Poster (Admin/Technical Only)
export const approvePoster = async (req: Request, res: Response) => {
  try {
    const { posterId } = req.params;
    const userId = req.userId;
    const { isApproved } = req.body;

    // Get existing poster first
    const existingPoster = await Poster.findById(posterId);
    if (!existingPoster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    const poster = await Poster.findByIdAndUpdate(
      posterId,
      {
        isApproved,
        approvedBy: userId,
        visibility: isApproved ? 'public' : existingPoster.visibility,
      },
      { new: true }
    );

    res.status(200).json({
      message: `Poster ${isApproved ? 'approved' : 'rejected'}`,
      poster,
    });
  } catch (error) {
    console.error('Approve poster error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
