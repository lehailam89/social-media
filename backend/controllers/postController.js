const Post = require('../models/Post');

// @desc    Create post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = new Post({
      user: req.userId,
      content,
      image: image || ''
    });

    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'firstName lastName avatar');

    res.status(201).json({ post: populatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all posts (newsfeed)
// @route   GET /api/posts
// @access  Private
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'firstName lastName avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user posts
// @route   GET /api/posts/user/:userId
// @access  Private
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'firstName lastName avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      })
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:postId
// @access  Private
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', 'firstName lastName avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:postId
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (content) post.content = content;
    if (image !== undefined) post.image = image;
    post.updatedAt = Date.now();

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('user', 'firstName lastName avatar')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        }
      });

    res.json({ post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:postId
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like/Unlike post
// @route   POST /api/posts/:postId/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.userId);

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.userId);
    }

    await post.save();

    res.json({ likes: post.likes, likesCount: post.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Pin/Unpin post
// @route   POST /api/posts/:postId/pin
// @access  Private
exports.pinPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.pinned = !post.pinned;
    await post.save();

    res.json({ pinned: post.pinned, message: post.pinned ? 'Post pinned' : 'Post unpinned' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Save/Unsave post
// @route   POST /api/posts/:postId/save
// @access  Private
exports.savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const User = require('../models/User');
    const user = await User.findById(req.userId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const saveIndex = post.savedBy.indexOf(req.userId);
    const userSaveIndex = user.savedPosts.indexOf(req.params.postId);

    if (saveIndex > -1) {
      // Unsave
      post.savedBy.splice(saveIndex, 1);
      user.savedPosts.splice(userSaveIndex, 1);
    } else {
      // Save
      post.savedBy.push(req.userId);
      user.savedPosts.push(req.params.postId);
    }

    await post.save();
    await user.save();

    res.json({ saved: saveIndex === -1, message: saveIndex === -1 ? 'Post saved' : 'Post unsaved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
