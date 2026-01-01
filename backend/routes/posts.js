const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// @route   POST /api/posts
// @desc    Create post
// @access  Private
router.post('/', auth, postController.createPost);

// @route   GET /api/posts
// @desc    Get all posts (newsfeed)
// @access  Private
router.get('/', auth, postController.getAllPosts);

// @route   GET /api/posts/user/:userId
// @desc    Get user posts
// @access  Private
router.get('/user/:userId', auth, postController.getUserPosts);

// @route   GET /api/posts/:postId
// @desc    Get single post
// @access  Private
router.get('/:postId', auth, postController.getPost);

// @route   PUT /api/posts/:postId
// @desc    Update post
// @access  Private
router.put('/:postId', auth, postController.updatePost);

// @route   DELETE /api/posts/:postId
// @desc    Delete post
// @access  Private
router.delete('/:postId', auth, postController.deletePost);

// @route   POST /api/posts/:postId/like
// @desc    Like/Unlike post
// @access  Private
router.post('/:postId/like', auth, postController.likePost);

module.exports = router;
