import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserRole from '../models/UserRole';
// @ts-ignore
const { validationResult } = require('express-validator');

const generateToken = (userId: string, team: string) => {
  return jwt.sign({ userId, team }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Support both username/fullName and email/password from frontend
    const { username, fullName, email, password, team, usn, phoneNumber } = req.body;
    const nameToUse = fullName || username || '';

    // Check if user already exists by username or email
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already in use' : 'Username already taken' 
      });
    }

    // Create new user
    const user = new User({
      username: username || email,
      name: nameToUse,
      email,
      password,
      team,
      usn,
      phoneNumber,
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.team);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        team: user.team,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Support both username and email for login
    const { username, email, password } = req.body;
    const loginIdentifier = username || email;

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
    }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'User account is inactive' });
    }

  const token = generateToken(user._id.toString(), user.team);

  // Fetch user role if present
  const userRole = await UserRole.findOne({ userId: user._id.toString() });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        team: user.team,
        role: userRole?.role || null,
        canAccessTeams: userRole?.canAccessTeams || [user.team],
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRole = await UserRole.findOne({ userId });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        team: user.team,
        usn: user.usn,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        role: userRole?.role || null,
        canAccessTeams: userRole?.canAccessTeams || [user.team],
      },
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
