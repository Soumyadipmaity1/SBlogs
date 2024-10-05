const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// all post
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// new post
router.post('/', async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  const post = new Post({ title, content });
  
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

// Update a post
router.put('/:id', async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;