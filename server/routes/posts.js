// posts.js - Post routes

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
const { protect, authorize } = require('../middleware/auth');
const { postValidationRules, handleValidationErrors } = require('../middleware/validate');
const { uploadSingle } = require('../middleware/upload');
const mongoose = require('mongoose');

// @desc    Get all posts with pagination and filtering
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Check if the parameter is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    
    let post;
    if (isValidObjectId) {
      // If it's a valid ObjectId, try to find by ID first, then by slug
      post = await Post.findOne({
        $or: [
          { _id: req.params.id },
          { slug: req.params.id }
        ]
      })
      .populate('author', 'name avatar')
      .populate('category', 'name color')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name avatar'
        }
      });
    } else {
      // If it's not a valid ObjectId, it must be a slug
      post = await Post.findOne({ slug: req.params.id })
        .populate('author', 'name avatar')
        .populate('category', 'name color')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'name avatar'
          }
        });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, uploadSingle, postValidationRules, handleValidationErrors, async (req, res) => {
  try {
    // Check if category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Category not found'
      });
    }

    // If an image was uploaded, set featuredImage to the filename
    let featuredImage = null;
    if (req.file) {
      featuredImage = req.file.filename;
    }

    const post = await Post.create({
      ...req.body,
      author: req.user.id,
      isPublished: true,
      featuredImage // will be null if no image uploaded
    });

    await post.populate('author', 'name avatar');
    await post.populate('category', 'name color');

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A post with this title already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
router.put('/:id', protect, uploadSingle, postValidationRules, handleValidationErrors, async (req, res) => {
  try {
    // Check if the parameter is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    
    let post;
    if (isValidObjectId) {
      // If it's a valid ObjectId, try to find by ID first, then by slug
      post = await Post.findOne({
        $or: [
          { _id: req.params.id },
          { slug: req.params.id }
        ]
      });
    } else {
      // If it's not a valid ObjectId, it must be a slug
      post = await Post.findOne({ slug: req.params.id });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Make sure user owns post or is admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this post'
      });
    }

    // Prepare update data
    const updateData = { ...req.body };
    
    // If a new image was uploaded, update the featuredImage
    if (req.file) {
      updateData.featuredImage = req.file.filename;
    }

    post = await Post.findByIdAndUpdate(post._id, updateData, {
      new: true,
      runValidators: true
    })
    .populate('author', 'name avatar')
    .populate('category', 'name color');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    // Check if the parameter is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    
    let post;
    if (isValidObjectId) {
      // If it's a valid ObjectId, try to find by ID first, then by slug
      post = await Post.findOne({
        $or: [
          { _id: req.params.id },
          { slug: req.params.id }
        ]
      });
    } else {
      // If it's not a valid ObjectId, it must be a slug
      post = await Post.findOne({ slug: req.params.id });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Make sure user owns post or is admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this post'
      });
    }

    await Post.findByIdAndDelete(post._id);

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
router.post('/:id/comments', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    if (!req.body.content || req.body.content.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Comment content is required'
      });
    }

    await post.addComment(req.user.id, req.body.content);

    await post.populate('comments.user', 'name avatar');

    res.status(201).json({
      success: true,
      data: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router; 