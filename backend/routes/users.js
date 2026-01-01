const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   GET /api/users/search/query
// @desc    Search users
// @access  Private
router.get('/search/query', auth, userController.searchUsers);

// @route   GET /api/users/friend-requests/list
// @desc    Get friend requests
// @access  Private
router.get('/friend-requests/list', auth, userController.getFriendRequests);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, userController.updateProfile);

// @route   POST /api/users/friend-request/accept/:userId
// @desc    Accept friend request
// @access  Private
router.post('/friend-request/accept/:userId', auth, userController.acceptFriendRequest);

// @route   POST /api/users/friend-request/:userId
// @desc    Send friend request
// @access  Private
router.post('/friend-request/:userId', auth, userController.sendFriendRequest);

// @route   GET /api/users/:userId
// @desc    Get user profile
// @access  Private
router.get('/:userId', auth, userController.getUserProfile);

module.exports = router;
