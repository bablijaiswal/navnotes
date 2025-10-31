# 📚 NavNotes

A knowledge-sharing platform for BCA students to upload, share, and discover study materials.

---

## About

**NavNotes** is a modern community-driven learning hub where BCA students can:
- 📝 Upload study materials (PDF, DOCX, TXT, Images)
- 🔗 Share useful learning resources and tutorials
- 🔍 Search and filter notes by keywords and subjects
- 👥 Browse notes uploaded by other students
- 🎨 Enjoy a beautiful dark/light mode interface with frosted glass UI
- 🔐 Secure authentication with JWT tokens
- 📱 Access on desktop and mobile devices

---

## 💻 Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **Vite 4** - Lightning-fast build tool and dev server
- **React Router v6** - Client-side navigation
- **Axios** - HTTP client for API calls
- **Tailwind CSS 3** - Utility-first CSS framework with frosted glass components
- **Context API** - Global state management (auth, theme)

### **Backend**
- **Node.js** - Server runtime
- **Express.js 4** - Web framework and routing
- **Mongoose 7** - MongoDB object modeling and validation
- **JWT + bcryptjs** - Secure authentication and password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin request support

### **Database**
- **MongoDB Atlas** - Cloud NoSQL database
- **Collections**: users (accounts), notes (uploads and links)

## 🏗️ Architecture

```
Browser (React Frontend)
    ↓ (HTTP/REST API)
Vite Dev Server (Port 5179)
    ↓ (API Proxy)
Express Backend (Port 5000)
    ↓ (Mongoose ODM)
MongoDB Atlas Cloud Database
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/notes/upload` | Upload file/link |
| GET | `/api/notes` | Get my notes |
| GET | `/api/notes/public` | Get all notes |
| DELETE | `/api/notes/:id` | Delete note |

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure signup/login with JWT tokens |
| 📤 **File Upload** | Share PDF, DOCX, TXT, JPG, PNG files |
| � **Link Sharing** | Post helpful course resources and tutorials |
| 🔍 **Search** | Find notes by keywords and filters |
| 👥 **Community Browse** | Discover materials shared by other students |
| 🎨 **Dark/Light Mode** | Beautiful UI with theme switching |
| 📱 **Responsive** | Works seamlessly on all devices |

---

## 📄 License

ISC

---

## 👨‍💻 Author

Babli Jaiswal - [@bablijaiswal](https://github.com/bablijaiswal)

---

