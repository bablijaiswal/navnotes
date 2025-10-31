# 📚 NavNotes

A simple website where BCA students can upload and share their study materials with each other.

---

## 📖 What is NavNotes?

**NavNotes** is a community learning platform where BCA students can:
- 📝 **Upload Notes** - Share your study materials (PDF, Word documents, text files, images)
- 🔗 **Share Links** - Post helpful tutorials and learning resources
- 🔍 **Search Notes** - Find what you need by typing keywords
- 👥 **Browse Materials** - See what other students have shared
- 🎨 **Dark/Light Mode** - Choose your favorite theme
- 🔐 **Safe & Secure** - Only you can access your uploads
- 📱 **Mobile Friendly** - Works on your phone and computer knowledge-sharing platform for BCA students to upload, share, and discover study materials.

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

## 💻 Technologies Used

### **Frontend (What you see in your browser)**
- **React 18** - Makes the website interactive
- **Vite 4** - Super fast development tool
- **React Router** - Allows you to navigate between pages
- **Axios** - Connects frontend to backend
- **Tailwind CSS** - Makes the website look beautiful
- **Context API** - Stores your login information

### **Backend (Server that runs in the cloud)**
- **Node.js** - Runs JavaScript on the server
- **Express.js** - Handles website requests
- **Mongoose** - Organizes database data
- **JWT** - Keeps your account secure
- **bcryptjs** - Encrypts your password
- **Multer** - Handles file uploads

### **Database (Where data is stored)**
- **MongoDB** - Cloud database that stores all notes and user accounts

## 🏗️ Architecture

## 🏗️ How It Works (Architecture)

```
Your Browser (Laptop/Phone)
    ↓
Website Frontend (React) - What you see
    ↓
Backend Server (Express) - Does the work
    ↓
Database (MongoDB) - Stores information
```

---

## ✨ Main Features

| Feature | What it does |
|---------|-------------|
| 🔐 **Sign Up & Login** | Create your account and login securely |
| 📤 **Upload Files** | Upload PDF, Word, Images to share |
| 🔗 **Share Links** | Post URLs of helpful tutorials |
| 🔍 **Search** | Find notes quickly using keywords |
| 👥 **View Others' Uploads** | See materials shared by classmates |
| 🎨 **Dark/Light Theme** | Choose light or dark interface |
| 📱 **Mobile Ready** | Use on phone or computer |

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
