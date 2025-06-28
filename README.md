[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19858243&assignment_repo_type=AssignmentRepo)
# MERN Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with user authentication, CRUD operations, and advanced features.

## 🚀 Features

### Core Features
- **User Authentication**: Register, login, logout with JWT tokens
- **Blog Posts**: Create, read, update, delete posts with rich content
- **Categories**: Organize posts by categories with color coding
- **Comments**: Add comments to posts (authenticated users only)
- **Search & Filter**: Search posts by title/content and filter by category
- **Pagination**: Navigate through posts with pagination
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### Advanced Features
- **Image Upload**: Featured images for blog posts
- **User Profiles**: View and update profile information
- **Role-based Access**: Admin and user roles with different permissions
- **Real-time Updates**: Optimistic UI updates for better UX
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **date-fns** - Date formatting

## 📁 Project Structure

```
week-4-mern-integration-assignment-Magisuz/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # File uploads
│   ├── package.json
│   └── server.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd week-4-mern-integration-assignment-Magisuz
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the server directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ```

5. **Start the development servers**

   **Terminal 1 - Start the backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user profile (requires authentication)

#### PUT /api/auth/me
Update user profile (requires authentication)

### Posts Endpoints

#### GET /api/posts
Get all posts with pagination and filters
```
Query parameters:
- page: number (default: 1)
- limit: number (default: 10)
- category: string (optional)
- search: string (optional)
```

#### GET /api/posts/:id
Get a single post by ID or slug

#### POST /api/posts
Create a new post (requires authentication)
```json
{
  "title": "Post Title",
  "content": "Post content...",
  "category": "categoryId",
  "tags": "tag1, tag2, tag3",
  "image": "file" // optional
}
```

#### PUT /api/posts/:id
Update a post (requires authentication)

#### DELETE /api/posts/:id
Delete a post (requires authentication)

#### POST /api/posts/:id/comments
Add a comment to a post (requires authentication)
```json
{
  "content": "Comment text"
}
```

### Categories Endpoints

#### GET /api/categories
Get all categories

#### POST /api/categories
Create a new category (admin only)
```json
{
  "name": "Category Name",
  "description": "Category description",
  "color": "#3B82F6"
}
```

## 🎯 Features Implemented

### ✅ Task 1: Project Setup
- [x] Clear directory structure for client and server
- [x] MongoDB connection with Mongoose
- [x] Express.js server with middleware
- [x] React frontend with Vite
- [x] Environment variables configuration

### ✅ Task 2: Back-End Development
- [x] RESTful API for blog application
- [x] Mongoose models for Post and Category
- [x] Input validation with express-validator
- [x] Error handling middleware
- [x] User authentication with JWT
- [x] File upload functionality

### ✅ Task 3: Front-End Development
- [x] React components for all views
- [x] React Router for navigation
- [x] React hooks for state management
- [x] Custom hooks for API calls
- [x] Responsive design with Tailwind CSS

### ✅ Task 4: Integration and Data Flow
- [x] API service in React
- [x] State management with Context API
- [x] Forms with validation
- [x] Optimistic UI updates
- [x] Loading and error states

### ✅ Task 5: Advanced Features
- [x] User authentication (registration, login, protected routes)
- [x] Image uploads for blog posts
- [x] Pagination for post list
- [x] Searching and filtering functionality
- [x] Comments feature for blog posts

## 🎨 Screenshots

*Add screenshots of your application here*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email]

## 🙏 Acknowledgments

- MERN Stack documentation
- Tailwind CSS for styling
- React community for excellent libraries 