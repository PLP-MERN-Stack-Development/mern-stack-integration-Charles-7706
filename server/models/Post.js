// Post.js - Mongoose model for blog posts

// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
    author: {
    type: String,
    default: 'Anonymous',
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', PostSchema); 
export default Post;