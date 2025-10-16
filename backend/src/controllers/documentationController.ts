import { Request, Response } from 'express';
import Resource from '../models/Resource';
import AboutPage from '../models/AboutPage';
const { validationResult } = require('express-validator');

// ========== RESOURCES ==========

export const createResource = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { title, description, url, category, type } = req.body;

    const resource = new Resource({
      title,
      description,
      url,
      category,
      type,
      uploadedBy: userId,
    });

    await resource.save();

    res.status(201).json({
      message: 'Resource created successfully',
      resource,
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllResources = async (req: Request, res: Response) => {
  try {
    const { category, type } = req.query;

    let filter: any = {};
    if (category) filter.category = category;
    if (type) filter.type = type;

    const resources = await Resource.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      total: resources.length,
      resources,
    });
  } catch (error) {
    console.error('Get all resources error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.params;
    const userId = req.userId;

    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.uploadedBy !== userId) {
      return res.status(403).json({ message: 'You can only edit your own resources' });
    }

    const updatedResource = await Resource.findByIdAndUpdate(resourceId, req.body, { new: true });

    res.status(200).json({
      message: 'Resource updated successfully',
      resource: updatedResource,
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.params;
    const userId = req.userId;

    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.uploadedBy !== userId) {
      return res.status(403).json({ message: 'You can only delete your own resources' });
    }

    await Resource.findByIdAndDelete(resourceId);

    res.status(200).json({
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ========== ABOUT PAGE ==========

export const updateAboutSection = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { section, content, imageUrl, order } = req.body;

    let aboutSection = await AboutPage.findOne({ section });

    if (aboutSection) {
      // Update existing
      aboutSection = await AboutPage.findOneAndUpdate(
        { section },
        {
          content,
          imageUrl: imageUrl || aboutSection.imageUrl,
          order: order || aboutSection.order,
          updatedBy: userId,
        },
        { new: true }
      );
    } else {
      // Create new
      aboutSection = new AboutPage({
        section,
        content,
        imageUrl,
        order: order || 1,
        updatedBy: userId,
      });
      await aboutSection.save();
    }

    res.status(200).json({
      message: 'About section updated successfully',
      section: aboutSection,
    });
  } catch (error) {
    console.error('Update about section error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAboutPage = async (req: Request, res: Response) => {
  try {
    const sections = await AboutPage.find().sort({ order: 1 });

    res.status(200).json({
      sections,
    });
  } catch (error) {
    console.error('Get about page error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAboutSection = async (req: Request, res: Response) => {
  try {
    const { section } = req.params;

    const aboutSection = await AboutPage.findOne({ section });

    if (!aboutSection) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.status(200).json({
      section: aboutSection,
    });
  } catch (error) {
    console.error('Get about section error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAboutSection = async (req: Request, res: Response) => {
  try {
    const { section } = req.params;

    const aboutSection = await AboutPage.findOneAndDelete({ section });

    if (!aboutSection) {
      return res.status(404).json({ message: 'Section not found' });
    }

    res.status(200).json({
      message: 'Section deleted successfully',
    });
  } catch (error) {
    console.error('Delete about section error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
