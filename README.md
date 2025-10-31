# 📚 NavNotes - Knowledge Sharing Platform

A modern, full-stack web application for **BCA students** to share, discover, and collaborate on study materials and learning resources.

![Status](https://img.shields.io/badge/status-active-success) ![License](https://img.shields.io/badge/license-ISC-blue) ![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 🎯 About NavNotes

NavNotes is a **community-driven learning hub** where students can:

- 📝 **Upload Study Materials** - Share PDF, DOCX, TXT, and image files
- 🔗 **Share Learning Links** - Curate useful course resources and tutorials
- 🔍 **Search & Discover** - Find notes by subject, keywords, or uploader
- 👥 **View Community** - Browse notes from fellow students
- 🎨 **Dark Mode Support** - Beautiful frosted glass UI with theme toggle
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

**Perfect for:** BCA students, study groups, and collaborative learning!

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- **MongoDB** (we use MongoDB Atlas - cloud-based)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/bablijaiswal/navnotes.git
cd navnotes

# Setup Backend
cd backend
npm install

# Setup Frontend
cd ../frontend
npm install
```

### Configuration

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

**Get MongoDB URI:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add your IP address to network access

### Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
# Backend runs on http://localhost:5000
# Output: "NavNotes server running on port 5000"
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5179 (or next available)
# Output: "Local: http://localhost:5179"
```

### Access the App
- 🌐 **Frontend**: http://localhost:5179
- 🔧 **Backend API**: http://localhost:5000
- 📚 **Full Documentation**: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

---

## 💻 Tech Stack

### Frontend
```
React 18          - UI Framework
Vite 4            - Build Tool & Dev Server
React Router v6   - Client-side Routing
Axios             - HTTP Client
Tailwind CSS 3    - Styling Framework
Context API       - State Management
```

### Backend
```
Node.js           - Runtime Environment
Express.js        - Web Framework
MongoDB           - NoSQL Database
Mongoose          - ODM (Object Data Modeling)
JWT               - Authentication
bcryptjs          - Password Hashing
Multer            - File Upload Handler
```

---

## ✨ Key Features

### 🔐 User Authentication
- Secure signup/login with JWT tokens
- Password hashing with bcryptjs
- Protected routes and API endpoints

### 📤 File Management
- Upload multiple file types (PDF, DOCX, TXT, JPG, PNG)
- 50MB file size limit
- File selection visual feedback (✅ emoji, green border, file size)
- Download shared files

### 🔗 Link Sharing
- Share useful course links and resources
- Add descriptions to links
- Open in new tab

### 🔍 Search & Filter
- Real-time search across all notes
- Filter by subject and keywords
- Search in descriptions too

### 👥 Community Features
- Browse all public community notes
- View uploader information
- Admin-curated key resources section
- User attribution on every note

### 🎨 UI/UX
- **Frosted glass design** with backdrop blur
- **Dark mode** support (toggle anytime)
- **Responsive layout** for all devices
- **Smooth animations** and transitions
- **Inter font** for modern typography

---

## 📁 Project Structure

```
navnotes/
│
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navigation & Logo
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Community Notes Browser
│   │   │   ├── Dashboard.jsx   # User Upload & Management
│   │   │   ├── Login.jsx       # Login Form
│   │   │   └── SignUp.jsx      # Registration Form
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # Auth State
│   │   │   └── ThemeContext.jsx # Theme State
│   │   ├── App.jsx             # Main Router
│   │   └── index.css           # Tailwind CSS
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js          # API Proxy Config
│
├── backend/                     # Node.js Application
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js         # User Schema
│   │   │   └── Note.js         # Note Schema
│   │   ├── routes/
│   │   │   ├── auth.js         # Auth Endpoints
│   │   │   └── notes.js        # Notes Endpoints
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT Middleware
│   │   ├── config/
│   │   │   └── database.js     # MongoDB Connection
│   │   └── server.js           # Main Server
│   ├── uploads/                # Uploaded Files
│   ├── package.json
│   ├── .env                    # Environment Variables
│   └── .env.example            # Template
│
├── PROJECT_OVERVIEW.md         # Detailed Architecture & Design
├── README.md                   # This File
└── .gitignore
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup          Create new account
POST   /api/auth/login           Login user
GET    /api/auth/me              Get current user (protected)
```

### Notes
```
POST   /api/notes/upload         Upload file or link (protected)
GET    /api/notes                Get user's notes (protected)
GET    /api/notes/public         Get all community notes (public)
DELETE /api/notes/:id            Delete user's note (protected)
GET    /api/notes/download/:id   Download file (public)
```

---

## 🔐 Security Features

✅ **Password Security**
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text

✅ **Authentication**
- JWT token-based authentication
- Tokens expire after 30 days
- Protected API routes

✅ **File Validation**
- MIME type checking
- File extension whitelist
- 50MB size limit
- Virus scanning ready

✅ **Data Protection**
- CORS enabled
- Environment variables for secrets
- MongoDB with authentication

---

## 📖 User Workflow

### 1️⃣ **Signup**
```
User → SignUp Page → Enter Details → Backend Hashes Password 
→ Saves to MongoDB → Returns JWT Token → User Logged In ✅
```

### 2️⃣ **Upload File**
```
User → Dashboard → Select File (shows ✅ emoji) → Enter Subject & Description 
→ Submit → Backend Saves File → Creates DB Record → Success Notification ✅
```

### 3️⃣ **Search & Browse**
```
User → Home Page → Type Search Term → Real-time Filter 
→ Click Result → View/Download → See Uploader Name ✅
```

---

## 🎨 Design System

### Colors
| Element | Color | Usage |
|---------|-------|-------|
| Primary | `#2563eb` | Buttons, Links |
| Dark BG | `#1a202c` | Dark mode background |
| Card | `#2d3748` | Dark mode cards |
| Success | `#10b981` | File selection |

### Components
- **Frosted Glass**: Semi-transparent cards with blur
- **Smooth Borders**: Subtle separators
- **Glow Effects**: Interactive hover states
- **Typography**: Inter font, multiple weights

---

## 📝 Available Scripts

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm start            # Start server
npm run dev          # Start with nodemon (auto-reload)
```

---

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
```
✅ Check internet connection
✅ Verify MongoDB URI in .env
✅ Add your IP to MongoDB Atlas network access
✅ Ensure database user has correct permissions
```

### Port already in use
```
✅ Backend uses port 5000
✅ Frontend uses port 5179 (auto-increments if busy)
✅ Kill process: lsof -i :5000 then kill -9 <PID>
```

### Files not uploading
```
✅ Check file size (max 50MB)
✅ Verify file type (PDF, DOCX, TXT, JPG, PNG)
✅ Ensure /backend/uploads folder exists
✅ Check backend logs for errors
```

---

## 📚 Documentation

- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Complete architecture, workflows, and design details
- **[API Documentation](./PROJECT_OVERVIEW.md#-api-endpoints)** - All endpoint details
- **[Data Models](./PROJECT_OVERVIEW.md#-data-models)** - Database schema documentation

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Project Stats

- **Lines of Code**: 2000+
- **Components**: 6
- **API Endpoints**: 7
- **Database Collections**: 2
- **Supported File Types**: 5
- **Max File Size**: 50MB

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Full-stack web development
- ✅ React with hooks and Context API
- ✅ Node.js and Express.js
- ✅ MongoDB and Mongoose
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ File upload handling
- ✅ Responsive UI design
- ✅ Git version control

**Perfect learning project for:**
- BCA students
- Bootcamp graduates
- Self-taught developers
- Anyone starting full-stack development

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Created by**: Babli Jaiswal  
**GitHub**: [@bablijaiswal](https://github.com/bablijaiswal)  
**Repository**: [navnotes](https://github.com/bablijaiswal/navnotes)

---

## 🙏 Acknowledgments

- React documentation
- Express.js community
- MongoDB Atlas
- Tailwind CSS
- Vite team

---

## 📞 Support

If you face any issues:
1. Check [Troubleshooting](#-troubleshooting) section
2. Review [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
3. Open an issue on GitHub
4. Check existing issues for solutions

---

## 🚀 Deployment

Ready to deploy? Check out:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render
- **Database**: MongoDB Atlas (already cloud-based)

---

## 📈 Future Enhancements

- [ ] Comments and ratings on notes
- [ ] Notification system
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Email verification
- [ ] Password reset
- [ ] Social sharing
- [ ] Notes categorization

---

**Happy Learning! 🎉**

For detailed technical information, visit [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

---

*Last Updated: October 31, 2025*
