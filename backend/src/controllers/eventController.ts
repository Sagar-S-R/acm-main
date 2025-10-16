import { Request, Response } from 'express';
import Event from '../models/Event';
const { validationResult } = require('express-validator');

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { title, description, date, location, imageUrl, speakers, status } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      imageUrl,
      speakers: speakers || [],
      status: status || 'upcoming',
      createdBy: userId,
    });

    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const { status, sortBy } = req.query;

    let filter: any = {};
    if (status) {
      filter.status = status;
    }

    let sortOptions: any = { date: -1 };
    if (sortBy === 'recent') {
      sortOptions = { createdAt: -1 };
    }

    const events = await Event.find(filter).sort(sortOptions);

    res.status(200).json({
      total: events.length,
      events,
    });
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only creator or admin can update
    if (event.createdBy !== userId) {
      return res.status(403).json({ message: 'You can only edit your own events' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only creator or admin can delete
    if (event.createdBy !== userId) {
      return res.status(403).json({ message: 'You can only delete your own events' });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark Event as Completed
export const markEventCompleted = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { attendees } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        status: 'completed',
        attendees: attendees || 0,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event marked as completed',
      event,
    });
  } catch (error) {
    console.error('Mark event completed error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
