const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// @route   POST /api/comments
// @desc    Create comment
// @access  Private
router.post('/', auth, commentController.createComment);

// @route   GET /api/comments/post/:postId
// @desc    Get comments for a post
// @access  Private
router.get('/post/:postId', auth, commentController.getComments);

// @route   DELETE /api/comments/:commentId
// @desc    Delete comment
// @access  Private
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
