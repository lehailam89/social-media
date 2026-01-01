const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');

// @route   POST /api/upload/image
// @desc    Upload image to Cloudinary
// @access  Private
router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary using upload stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'social-media',
        resource_type: 'image',
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Error uploading to Cloudinary' });
        }

        res.json({
          success: true,
          imageUrl: result.secure_url,
          publicId: result.public_id,
          message: 'Image uploaded successfully'
        });
      }
    );

    // Pipe the buffer to cloudinary
    const streamifier = require('streamifier');
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/upload/image/:publicId
// @desc    Delete image from Cloudinary
// @access  Private
router.delete('/image/:publicId', auth, async (req, res) => {
  try {
    const publicId = req.params.publicId.replace(/-/g, '/');
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Failed to delete image' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
