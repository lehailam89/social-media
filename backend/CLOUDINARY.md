# Cloudinary Integration

## Setup

This project uses Cloudinary for image storage and delivery.

### Configuration

Add the following to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=dbaprvdsg
CLOUDINARY_API_KEY=829831567396439
CLOUDINARY_API_SECRET=pxtGICA3OIPanpWyeGGTV4gPtiw
```

### Features

- ✅ Upload images to Cloudinary cloud storage
- ✅ Automatic image optimization
- ✅ Image resizing (max 1000x1000px)
- ✅ Auto quality adjustment
- ✅ Fast CDN delivery
- ✅ Image deletion support

### API Endpoints

**Upload Image**
```
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- image: File

Response:
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/...",
  "publicId": "social-media/xxx",
  "message": "Image uploaded successfully"
}
```

**Delete Image**
```
DELETE /api/upload/image/:publicId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### Benefits

1. **No Local Storage**: Images are stored in the cloud
2. **Fast Delivery**: Images served via CDN
3. **Automatic Optimization**: Images are automatically compressed
4. **Scalable**: No server storage limits
5. **Secure**: Images hosted on Cloudinary's secure infrastructure
