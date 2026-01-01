const User = require('../models/User');

// @desc    Get recent users
// @route   GET /api/users/recent
// @access  Public
exports.getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('firstName lastName profilePicture')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/:userId
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('friends', 'firstName lastName avatar');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, avatar } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({ user: await User.findById(req.userId).select('-password') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send friend request
// @route   POST /api/users/friend-request/:userId
// @access  Private
exports.sendFriendRequest = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.userId);
    
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already friends
    if (targetUser.friends.includes(req.userId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    // Check if request already sent
    if (targetUser.friendRequests.includes(req.userId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    targetUser.friendRequests.push(req.userId);
    await targetUser.save();

    res.json({ message: 'Friend request sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Accept friend request
// @route   POST /api/users/friend-request/accept/:userId
// @access  Private
exports.acceptFriendRequest = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const requestUser = await User.findById(req.params.userId);

    if (!requestUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove from friend requests
    currentUser.friendRequests = currentUser.friendRequests.filter(
      id => id.toString() !== req.params.userId
    );

    // Add to friends for both users
    currentUser.friends.push(req.params.userId);
    requestUser.friends.push(req.userId);

    await currentUser.save();
    await requestUser.save();

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get friend requests
// @route   GET /api/users/friend-requests/list
// @access  Private
exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('friendRequests', 'firstName lastName avatar');
    
    res.json({ friendRequests: user.friendRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search users
// @route   GET /api/users/search/query
// @access  Private
exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    })
    .select('-password')
    .limit(10);

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
