// const express = require('express');
import { Router } from 'express';
// const router = express.Router();
const router = Router();
// const post = require('../models/Post')
import express from 'express';
// const router = express.Router();
import post from '../models/Post.js';
// const post = require('../models/Post')

// Create a new post
router.post('/', async (req, res, next) => {
  try {
    const newPost = new post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
});

// Get all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await post.find().populate('author', 'username email');
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// Get a single post by ID  
router.get('/:id', async (req, res, next) => {
  try {
    const singlePost = await post.findById(req.params.id).populate('author', 'username email');
    if (!singlePost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(singlePost);
  } catch (err) {
    next(err);
  }
});
// Update a post by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedPost = await post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );  
    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' }); 
    }
    res.status(200).json(updatedPost);
    } catch (err) { 
     next(err);
    }
});

// Delete a post by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPost = await post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;