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

## 🚀 Application Overview

The architecture follows a **three-tier pattern**:

1. **Frontend Layer** - React components with state management
2. **Backend Layer** - Express API routes handling business logic
3. **Database Layer** - MongoDB storing persistent data

Data flows through:
- User interactions → React components → Axios API calls
- Backend validates & processes → Mongoose models
- Results returned to frontend for rendering

---

## 🔐 Security Features

1. **Password Hashing**: bcryptjs (10 salt rounds)
2. **JWT Tokens**: Secure session management with AuthContext
3. **File Validation**: MIME type checking (PDF, DOCX, TXT, JPG, PNG)
4. **File Size Limit**: 50MB max per upload
5. **Environment Variables**: Sensitive data in `.env`
6. **Protected Routes**: JWT verification on sensitive endpoints

---

## 📊 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user and get JWT token
- `GET /api/auth/me` - Get current user profile (requires JWT)

### **Notes Management**
- `POST /api/notes/upload` - Upload file or share link (requires JWT)
- `GET /api/notes` - Retrieve user's personal notes (requires JWT)
- `GET /api/notes/public` - Browse all community notes (public)
- `DELETE /api/notes/:id` - Delete user's note (requires JWT)
- `GET /api/notes/download/:id` - Download file by ID (public)

---

## 🔄 Feature Workflows

### **File Upload Process**
1. User selects file on Dashboard
2. Visual feedback: ✅ emoji, green border, file size shown
3. User enters subject and description
4. Submit → FormData sent to backend via Axios
5. Backend: Multer saves file to `/uploads/` folder
6. MongoDB record created with metadata and user reference
7. User sees confirmation in Dashboard

### **Authentication Process**
1. User fills signup form (name, email, password)
2. Frontend sends to `/api/auth/signup`
3. Backend hashes password with bcryptjs
4. User document stored in MongoDB
5. JWT token generated and returned
6. Frontend stores token in AuthContext
7. Token sent in headers for future requests

### **Search & Browse Process**
1. Home page loads public community notes
2. Admin resources displayed at top
3. User types in search bar
4. Frontend filters notes by subject/caption in real-time
5. Results update instantly
6. Click file → direct download from `/uploads/`
7. Click link → opens external URL
8. Uploader name shown for attribution

---

## 💾 Data Persistence

**User Model** stores:
- Unique email (prevents duplicate accounts)
- Hashed password (never stored in plain text)
- Full name for display
- Creation timestamp

**Note Model** stores:
- Subject/title of the material
- Description/caption
- Type: 'file' or 'link'
- File metadata: name, size, upload URL
- Or link URL for external resources
- Reference to uploader (User ID)
- Upload timestamp
- Flag for admin resources

---

## 🎨 User Interface

**Pages Available**:
- **Home** - Browse all public community notes + admin resources
- **Dashboard** - Personal note management and file uploads
- **Login** - Existing user authentication
- **SignUp** - New user registration

**Key UI Features**:
- Frosted glass design with backdrop blur
- Dark/light mode toggle via Theme Context
- Responsive grid layout for all screen sizes
- File selection visual feedback (✅ emoji indicator)
- Real-time search filtering
- Download progress indicators for files
- Smooth navigation with React Router

---

## 📁 Project Structure

```
navnotes/
├── frontend/                      # React Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx        # Navigation + theme toggle
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Public notes + admin resources
│   │   │   ├── Dashboard.jsx     # File upload + my notes
│   │   │   ├── Login.jsx         # User login form
│   │   │   └── SignUp.jsx        # User registration form
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth state + JWT management
│   │   │   └── ThemeContext.jsx  # Dark/light mode
│   │   ├── App.jsx               # Router setup & layout
│   │   └── index.css             # Tailwind CSS imports
│   ├── package.json              # React dependencies
│   └── vite.config.js            # Build config + API proxy
│
├── backend/                       # Node.js Express Application
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js           # User schema (name, email, password)
│   │   │   └── Note.js           # Note schema (files + links)
│   │   ├── routes/
│   │   │   ├── auth.js           # Signup, login endpoints
│   │   │   └── notes.js          # Upload, browse, delete endpoints
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT verification middleware
│   │   ├── config/
│   │   │   └── database.js       # MongoDB connection
│   │   └── server.js             # Express app entry point
│   ├── uploads/                  # Folder for uploaded files
│   ├── package.json              # Node.js dependencies
│   └── .env                      # MongoDB URI + JWT secret
│
├── .gitignore                    # Exclude node_modules, .env, uploads
├── .vscode/
│   └── settings.json             # Linting config
└── README.md                     # Quick reference guide
```

---

## 🎯 Key Technical Highlights

| Component | Technology | Why Used |
|-----------|-----------|---------|
| **Frontend Framework** | React 18 | Component reusability & state management |
| **Build Tool** | Vite 4 | 10x faster than webpack, HMR |
| **Styling** | Tailwind CSS 3 | Utility-first, no CSS files needed |
| **State Management** | Context API | Lightweight, no Redux needed |
| **Backend Framework** | Express.js 4 | Minimal, flexible Node.js framework |
| **Database** | MongoDB Atlas | NoSQL, cloud-hosted, flexible schema |
| **ODM** | Mongoose 7 | Schema validation, query helpers |
| **Authentication** | JWT + bcryptjs | Stateless, secure token-based auth |
| **File Upload** | Multer | Standard middleware for multipart |
| **HTTP Client** | Axios | Promise-based, request interceptors |
| **Deployment Ready** | Cloud agnostic | Can deploy to Vercel, Railway, Heroku |

---

## 📚 Learning Path Demonstrated

- ✅ Full-stack JavaScript development
- ✅ Component-driven architecture
- ✅ RESTful API design principles
- ✅ Database design and relationships
- ✅ Authentication & authorization
- ✅ File handling & storage
- ✅ Real-time filtering & search
- ✅ Responsive design patterns
- ✅ Modern tooling & build processes
- ✅ Version control with Git

---

**Status**: ✅ Production Ready  
**Last Updated**: Oct 31, 2025  
**Repository**: https://github.com/bablijaiswal/navnotes
