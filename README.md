# Social Media Website

Một ứng dụng mạng xã hội đầy đủ tính năng được xây dựng với React, Node.js, Express và MongoDB.

## Tính năng

- 🔐 Xác thực người dùng (Đăng ký, Đăng nhập, JWT)
- 📝 Tạo, sửa, xóa bài viết
- 👍 Like bài viết
- 💬 Comment trên bài viết
- 👥 Gửi và chấp nhận lời mời kết bạn
- 👤 Trang profile người dùng
- 🔍 Tìm kiếm người dùng
- 📱 Giao diện responsive

## Công nghệ sử dụng

### Frontend
- React 18
- React Router v6
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB với Mongoose
- JWT Authentication
- Bcrypt

## Cài đặt

### Yêu cầu
- Node.js (v14 trở lên)
- MongoDB (local hoặc MongoDB Atlas)
- npm hoặc yarn

### Backend Setup

1. Di chuyển vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` và cấu hình:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/social-media
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Khởi động MongoDB (nếu chạy local):
```bash
mongod
```

5. Chạy server:
```bash
npm run dev
```

Server sẽ chạy tại: http://localhost:5000

### Frontend Setup

1. Mở terminal mới và di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng React:
```bash
npm start
```

Ứng dụng sẽ mở tại: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Users
- `GET /api/users/:userId` - Lấy thông tin profile
- `PUT /api/users/profile` - Cập nhật profile
- `POST /api/users/friend-request/:userId` - Gửi lời mời kết bạn
- `POST /api/users/friend-request/accept/:userId` - Chấp nhận lời mời
- `GET /api/users/friend-requests/list` - Danh sách lời mời kết bạn
- `GET /api/users/search/query?q=...` - Tìm kiếm người dùng

### Posts
- `POST /api/posts` - Tạo bài viết mới
- `GET /api/posts` - Lấy tất cả bài viết
- `GET /api/posts/:postId` - Lấy chi tiết bài viết
- `GET /api/posts/user/:userId` - Lấy bài viết của user
- `PUT /api/posts/:postId` - Cập nhật bài viết
- `DELETE /api/posts/:postId` - Xóa bài viết
- `POST /api/posts/:postId/like` - Like/Unlike bài viết

### Comments
- `POST /api/comments` - Tạo comment mới
- `GET /api/comments/post/:postId` - Lấy comments của bài viết
- `DELETE /api/comments/:commentId` - Xóa comment

## Cấu trúc thư mục

```
social-media/
├── backend/
│   ├── controllers/     # Controllers (Business Logic)
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── models/          # Mongoose models (Data Layer)
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/          # API routes (Routing Layer)
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── comments.js
│   ├── middleware/      # Middleware functions
│   │   └── auth.js
│   ├── server.js        # Express server
│   ├── seed.js          # Database seeder
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── context/     # Context API
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Mô hình MVC

Backend được cấu trúc theo mô hình MVC (Model-View-Controller):

- **Models**: Định nghĩa cấu trúc dữ liệu và tương tác với MongoDB
- **Controllers**: Xử lý logic nghiệp vụ và điều khiển luồng dữ liệu
- **Routes**: Định nghĩa API endpoints và ánh xạ tới controllers
- **Middleware**: Xác thực và xử lý requests

## License

MIT
