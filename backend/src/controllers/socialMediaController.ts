import { Request, Response } from 'express';
import SocialMediaPost from '../models/SocialMediaPost';
const { validationResult } = require('express-validator');

// Create Social Media Post
export const createPost = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { title, content, eventId, eventName, platforms, imageUrl, scheduledDate, links } = req.body;

    const post = new SocialMediaPost({
      title,
      content,
      eventId: eventId || null,
      eventName,
      platforms: platforms || [],
      imageUrl: imageUrl || null,
      scheduledDate: scheduledDate || null,
      postedBy: userId,
      links: links || {},
      isPosted: false,
    });

    await post.save();

    res.status(201).json({
      message: 'Social media post created successfully',
      post,
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Posts (Team Member Posts)
export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { status } = req.query;

    let filter: any = { postedBy: userId };
    if (status === 'scheduled') {
      filter.isPosted = false;
      filter.scheduledDate = { $ne: null };
    } else if (status === 'posted') {
      filter.isPosted = true;
    }

    const posts = await SocialMediaPost.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      total: posts.length,
      posts,
    });
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Team Posts (Social Media Team)
export const getTeamPosts = async (req: Request, res: Response) => {
  try {
    const posts = await SocialMediaPost.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: posts.length,
      posts,
    });
  } catch (error) {
    console.error('Get team posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Posts by Event
export const getPostsByEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const posts = await SocialMediaPost.find({ eventId }).sort({ createdAt: -1 });

    res.status(200).json({
      total: posts.length,
      posts,
    });
  } catch (error) {
    console.error('Get posts by event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await SocialMediaPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.postedBy !== userId) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }

    const updatedPost = await SocialMediaPost.findByIdAndUpdate(postId, req.body, { new: true });

    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Mark Post as Posted
export const markAsPosted = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { links } = req.body;

    const post = await SocialMediaPost.findByIdAndUpdate(
      postId,
      {
        isPosted: true,
        postedDate: new Date(),
        links: links || {},
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      message: 'Post marked as posted',
      post,
    });
  } catch (error) {
    console.error('Mark as posted error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Engagement
export const updateEngagement = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { likes, comments, shares } = req.body;

    const post = await SocialMediaPost.findByIdAndUpdate(
      postId,
      {
        engagement: {
          likes: likes || 0,
          comments: comments || 0,
          shares: shares || 0,
        },
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      message: 'Engagement updated',
      post,
    });
  } catch (error) {
    console.error('Update engagement error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await SocialMediaPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.postedBy !== userId) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    await SocialMediaPost.findByIdAndDelete(postId);

    res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
