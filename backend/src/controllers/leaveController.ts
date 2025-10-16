import { Request, Response } from 'express';
import Leave from '../models/Leave';
import User from '../models/User';
const { validationResult } = require('express-validator');

export const applyLeave = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { leaveType, reason, startDate, endDate } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Create leave request
    const leave = new Leave({
      userId,
      userName: user.name,
      team: user.team,
      leaveType,
      reason,
      startDate: start,
      endDate: end,
      numberOfDays,
    });

    await leave.save();

    res.status(201).json({
      message: 'Leave applied successfully',
      leave,
    });
  } catch (error) {
    console.error('Apply leave error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMyLeaves = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const leaves = await Leave.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      leaves,
    });
  } catch (error) {
    console.error('Get leaves error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTeamLeaves = async (req: Request, res: Response) => {
  try {
    const userTeam = req.userTeam;

    const leaves = await Leave.find({ team: userTeam }).sort({ createdAt: -1 });

    res.status(200).json({
      leaves,
    });
  } catch (error) {
    console.error('Get team leaves error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateLeaveStatus = async (req: Request, res: Response) => {
  try {
    const { leaveId } = req.params;
    const { status, approvedBy } = req.body;

    // Validate status
    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Get existing leave first
    const existingLeave = await Leave.findById(leaveId);
    if (!existingLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, approvedBy: approvedBy || existingLeave.approvedBy },
      { new: true }
    );

    res.status(200).json({
      message: 'Leave status updated successfully',
      leave,
    });
  } catch (error) {
    console.error('Update leave status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
