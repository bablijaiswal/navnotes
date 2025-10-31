# NavNotes - Project Overview

## 📚 About NavNotes

**NavNotes** is a modern **knowledge-sharing platform** for BCA (Bachelor of Computer Applications) students. It's a community-driven learning hub where students can share notes, resources, and helpful links for their coursework.

### Key Features:
- 📝 **User Authentication** - Secure signup/login with JWT tokens
- 📤 **File Upload** - Share study materials (PDF, DOCX, TXT, Images)
- 🔗 **Link Sharing** - Share useful course resources and tutorials
- 🔍 **Search & Filter** - Find notes by subject, keywords
- 👥 **Community Notes** - Browse notes uploaded by other students
- 📚 **Admin Resources** - Curated key resources for each course
- 🎨 **Dark/Light Mode** - Beautiful frosted glass UI with theme support
- 📱 **Responsive Design** - Works on desktop and mobile devices

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
│              http://localhost:5179                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP/REST API Calls
                      │ (via Axios)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (Vite + React)                         │
│  - Components: Home, Dashboard, Login, SignUp               │
│  - State: Auth Context, Theme Context                       │
│  - Styling: Tailwind CSS (Frosted Glass UI)                 │
│  - Port: 5179                                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ API Proxy: /api/* → localhost:5000
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│             BACKEND (Express.js + Node.js)                   │
│  - Routes: /api/auth/*, /api/notes/*                        │
│  - Middleware: JWT Auth, Multer (file upload)               │
│  - Port: 5000                                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Mongoose ODM
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│         DATABASE (MongoDB Atlas Cloud)                       │
│  - Collections: users, notes                                 │
│  - Authentication: Connection URI with credentials          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### **Frontend**
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 | Component-based UI |
| **Build Tool** | Vite 4 | Fast dev server & bundler |
| **Routing** | React Router v6 | Client-side navigation |
| **HTTP Client** | Axios | API communication |
| **Styling** | Tailwind CSS 3 | Utility-first CSS framework |
| **Font** | Inter (Google Fonts) | Modern, clean typography |
| **State Management** | React Context API | Global auth & theme state |

### **Backend**
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js | JavaScript server runtime |
| **Framework** | Express.js 4 | Web server & routing |
| **Database ORM** | Mongoose 7 | MongoDB object modeling |
| **Authentication** | JWT + bcryptjs | Secure login & passwords |
| **File Upload** | Multer | Handle multipart form data |
| **CORS** | CORS middleware | Allow cross-origin requests |
| **Environment** | dotenv | Manage sensitive config |

### **Database**
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Database** | MongoDB Atlas | Cloud NoSQL database |
| **Schema Validation** | Mongoose schemas | Data structure enforcement |
| **Collections** | users, notes | Store app data |

---

## 📊 Data Models

### **User Model**
```javascript
{
  _id: ObjectId,
  name: String,                    // Full name
  email: String (unique),          // Email address
  password: String (hashed),       // bcryptjs encrypted
  createdAt: Date
}
```

### **Note Model**
```javascript
{
  _id: ObjectId,
  subject: String,                 // Title/Subject
  caption: String,                 // Description
  noteType: String,                // 'file' or 'link'
  uploadedBy: {
    _id: ObjectId (User ref),
    name: String
  },
  
  // For file uploads:
  fileUrl: String,                 // Download URL
  fileName: String,
  fileSize: Number,
  
  // For link sharing:
  linkUrl: String,                 // External URL
  
  // For admin resources:
  isResource: Boolean,
  
  uploadedAt: Date
}
```

---

## 🔄 Workflow - How It Works

### **1️⃣ User Authentication Flow**

```
┌─────────────────┐
│   User lands    │
│   on homepage   │
└────────┬────────┘
         │
         ▼
  ┌─────────────┐
  │   Signup?   │──No──→ [Login Page]
  └──────┬──────┘
         │ Yes
         ▼
  [SignUp Page]
       │
       ├─ Enter: name, email, password
       │
       ▼
  [POST /api/auth/signup]
       │
       ├─ Backend: Hash password with bcryptjs
       ├─ Save user to MongoDB
       ├─ Generate JWT token
       │
       ▼
  [Token returned to frontend]
       │
       ├─ Store in Context API (AuthContext)
       ├─ Set Authorization header
       │
       ▼
  [Redirect to Dashboard] ✅
```

### **2️⃣ File Upload Flow**

```
┌─────────────────────────┐
│  User on Dashboard      │
│  Selects: "Upload File" │
└────────┬────────────────┘
         │
         ▼
  ┌─────────────────────────┐
  │ File Input Component    │
  │ - Select file (✅ shows │
  │ - Green border shows    │
  │ - File size displays    │
  └─────────┬───────────────┘
            │
            ├─ User enters subject/title
            ├─ User enters description
            │
            ▼
  [POST /api/notes/upload]
  FormData:
  - file (binary)
  - subject (string)
  - caption (string)
  - noteType: 'file'
            │
            ├─ Multer saves file to /uploads/
            ├─ Creates MongoDB note document
            ├─ Associates with current user
            │
            ▼
  [Success notification] ✅
  Note appears in Dashboard
```

### **3️⃣ Search & Browse Flow**

```
┌──────────────────────┐
│  User on Home page   │
│ (Public community)   │
└──────┬───────────────┘
       │
       ├─ Sees key resources (admin curated)
       ├─ Sees community notes (all users)
       │
       ▼
  [Type in search bar]
       │
       ├─ Real-time filter on:
       │  * Note subject
       │  * Note caption/description
       │
       ▼
  [Filtered results display]
       │
       ├─ Click resource → opens link
       ├─ Click file → downloads
       ├─ See uploader name (attribution)
       │
       ▼
  [User attribution shown] ✅
```

---

## 🎨 Design System

### **Color Scheme**
- **Primary Blue**: `#2563eb` (buttons, links)
- **Cozy Dark**: `#1a202c` (dark mode background)
- **Card Dark**: `#2d3748` (dark mode cards)
- **Light Gray**: `#f9fafb` (light mode background)

### **UI Components**
- **Frosted Glass**: `backdrop-blur-lg` with opacity backgrounds
- **Smooth Borders**: `border-white/20` for subtle separation
- **Glow Effect**: Custom shadow for hover: `hover:shadow-[0_0_20px_rgba(...)]`
- **Responsive**: Mobile-first Tailwind breakpoints

### **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800
- **Dark Mode**: Full support with proper contrast

---

## 📁 Project Structure

```
navnotes/
├── frontend/                      # React Vite App
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx        # Navigation bar with logo
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Public community notes
│   │   │   ├── Dashboard.jsx     # User upload & notes
│   │   │   ├── Login.jsx         # Login form
│   │   │   └── SignUp.jsx        # Registration form
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # User auth state
│   │   │   └── ThemeContext.jsx  # Dark/light mode
│   │   ├── App.jsx               # Main router
│   │   └── index.css             # Tailwind directives
│   ├── package.json
│   └── vite.config.js            # API proxy config
│
├── backend/                       # Node.js Express App
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js           # User schema
│   │   │   └── Note.js           # Note schema
│   │   ├── routes/
│   │   │   ├── auth.js           # Auth endpoints
│   │   │   └── notes.js          # Notes endpoints
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT verification
│   │   ├── config/
│   │   │   └── database.js       # MongoDB connection
│   │   └── server.js             # Main server file
│   ├── uploads/                  # File storage
│   ├── package.json
│   └── .env                      # Config (MongoDB URI, JWT secret)
│
├── .vscode/
│   └── settings.json             # CSS linter config
│
└── .gitignore                    # Exclude node_modules, .env
```

---

## 🚀 How to Run

### **Start Backend**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
# MongoDB connects automatically
```

### **Start Frontend**
```bash
cd frontend
npm run dev
# Dev server runs on http://localhost:5179 (or next available)
# Vite proxy routes /api/* to backend
```

### **Access Application**
- 🌐 Frontend: http://localhost:5179
- 🔧 Backend API: http://localhost:5000
- 📝 Sign up to create account
- 📤 Upload files or share links
- 🔍 Search community notes

---

## 🔐 Security Features

1. **Password Hashing**: bcryptjs (10 salt rounds)
2. **JWT Tokens**: Secure session management
3. **File Validation**: MIME type checking (PDF, DOCX, TXT, JPG, PNG)
4. **File Size Limit**: 50MB max per upload
5. **CORS**: Configured for localhost development
6. **Environment Variables**: Sensitive data in `.env`

---

## 📊 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### **Notes**
- `POST /api/notes/upload` - Upload file or link (protected)
- `GET /api/notes` - Get user's notes (protected)
- `GET /api/notes/public` - Get all community notes (public)
- `DELETE /api/notes/:id` - Delete user's note (protected)
- `GET /api/notes/download/:id` - Download file (public)

---

## 🎯 Learning Outcomes

This project demonstrates:
- ✅ Full-stack development (React + Node.js)
- ✅ RESTful API design
- ✅ Database modeling with Mongoose
- ✅ User authentication & authorization
- ✅ File upload handling
- ✅ Context API state management
- ✅ Responsive UI design with Tailwind
- ✅ Modern development workflow with Vite
- ✅ Git version control & GitHub deployment

---

## 🔄 Key Features Workflow Summary

| Feature | Frontend | Backend | Database |
|---------|----------|---------|----------|
| **Authentication** | React Context | JWT + bcrypt | User collection |
| **File Upload** | Multer input + Axios | Express + Multer | Note collection + /uploads/ |
| **Search** | Real-time filter | GET /api/notes | MongoDB query |
| **Dark Mode** | Theme Context | N/A | N/A |
| **Attribution** | Display uploadedBy | Store with note | Ref to user |

---

## 📝 Version Info

- **Frontend**: React 18, Vite 4, Tailwind 3
- **Backend**: Node.js, Express 4, Mongoose 7
- **Database**: MongoDB Atlas
- **Deployed**: Local development (ready for deployment)

---

**Created**: Oct 31, 2025  
**Status**: ✅ Fully Functional  
**Repository**: https://github.com/bablijaiswal/navnotes
