# NavNotes - Project Overview

## 📚 What is NavNotes?

**NavNotes** is a website for BCA students to share study notes and resources with each other. Think of it like a social media platform, but only for educational materials!

**Main Purpose**: Students can upload PDFs, documents, and links to help their classmates study better.

### Key Features:
- 📝 **Share Notes** - Upload study materials and documents
- 🔗 **Share Links** - Post helpful tutorials and resources  
- 🔍 **Search** - Find notes by entering keywords
- 👥 **Community Hub** - See what other students have shared
- 🎨 **Beautiful UI** - Includes dark and light mode themes
- 🔐 **Secure Accounts** - Only you can manage your uploads
- 📱 **Works Everywhere** - Mobile friendly design

---

## 🏗️ System Architecture (How Everything Works)

Think of NavNotes like a restaurant:
- **Customer (You)** = Browser with the website
- **Waiter** = Frontend (React) - Shows information and takes your requests
- **Kitchen** = Backend (Express) - Processes requests and does the work
- **Storage** = Database (MongoDB) - Stores all the information

```
┌─────────────────────────────────────────────────────────────┐
│                   YOUR BROWSER                               │
│                (What you see)                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Sends requests
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            FRONTEND (React + Vite)                           │
│  Shows buttons, forms, notes                                │
│  Handles clicking and typing                                │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Passes requests
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│         BACKEND SERVER (Express + Node.js)                   │
│  Checks if you're logged in                                 │
│  Saves uploads, searches database                           │
│  Sends back results                                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Stores/retrieves data
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            DATABASE (MongoDB)                                │
│  Stores all user accounts                                   │
│  Stores all uploaded files information                      │
│  Stores all shared links                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack (What We Use)

### **Frontend - The Website You See**
| Part | Tool | What it does |
|------|------|-------------|
| **Main Framework** | React 18 | Makes interactive buttons and forms |
| **Build Tool** | Vite 4 | Makes the website load super fast |
| **Navigation** | React Router | Lets you go between pages (Home, Dashboard, Login) |
| **Communication** | Axios | Talks to the backend server |
| **Styling** | Tailwind CSS | Makes everything look pretty |
| **Login State** | Context API | Remembers you're logged in |

### **Backend - The Worker Server**
| Part | Tool | What it does |
|------|------|-------------|
| **Runtime** | Node.js | Runs the server |
| **Framework** | Express.js | Listens to requests and responds |
| **Database Helper** | Mongoose | Organizes data in MongoDB |
| **Security** | JWT + bcryptjs | Keeps passwords safe, creates login tokens |
| **File Handling** | Multer | Saves uploaded files |

### **Database - The Storage**
| Part | Tool | What it does |
|------|------|-------------|
| **Database** | MongoDB | Stores all data in the cloud |
| **Collections** | users, notes | Tables that store user accounts and uploaded files |

---

## 📊 What Data is Stored?

### **User Information**
```
Each user account stores:
- Your name
- Your email (unique, can't have duplicates)
- Your password (encrypted for safety)
- When you created your account
```

### **Note Information**
```
Each uploaded note stores:
- Title/Subject of the material
- Description of what it contains
- Type (file upload or link)
- Who uploaded it (username)
- File name and size (if it's a file)
- Link URL (if it's a link)
- Upload date/time
```

---

## 🔄 How Common Tasks Work

### **1️⃣ Creating an Account (Sign Up)**

```
1. You click "Sign Up"
2. You enter: name, email, password
3. Your password gets encrypted (scrambled so nobody can read it)
4. Account is saved in the database
5. You get a secret token (like a ticket to use the app)
6. Token is stored on your computer
7. You're now logged in ✅
```

### **2️⃣ Uploading a File**

```
1. You go to Dashboard
2. You click "Upload File"
3. A green box appears showing your file is selected ✅
4. You write a title and description
5. You click "Upload"
6. File is sent to the server
7. Server saves it to the uploads folder
8. Server creates a record in the database
9. You see it in your "My Notes" section ✅
```

### **3️⃣ Searching for Notes**

```
1. You go to Home page
2. You see all shared notes
3. You type a keyword in the search box
4. Notes are instantly filtered
5. Only matching notes are shown
6. You can click to download or open links ✅
```

### **4️⃣ Viewing Other Students' Uploads**

```
1. Go to Home page
2. See all public community notes
3. See who uploaded each file
4. Click to download or view
5. File opens or download starts ✅
```

---

## 🎨 Design & User Interface

### **Pages in NavNotes**
- **Home Page** - See all shared notes from everyone (public view)
- **Dashboard** - Upload your own notes and see your uploads
- **Login Page** - Enter your email and password
- **Sign Up Page** - Create a new account

### **Design Features**
- **Dark & Light Modes** - Choose your preferred theme
- **Clean Layout** - Easy to understand buttons and sections
- **Mobile Friendly** - Works on phone, tablet, or computer
- **Visual Feedback** - Green checkmark when file is selected
- **Search Bar** - Instantly filters results as you type

### **Colors Used**
- **Blue** - Buttons and important links
- **Dark Gray** - Dark mode background
- **Light Gray** - Light mode background
- **White/Transparent** - Cards and containers

---

## 📁 Project Files Organization

```
navnotes/
│
├── frontend/                  # Website code (React)
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx    # Top navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Home page - see all notes
│   │   │   ├── Dashboard.jsx # Upload page
│   │   │   ├── Login.jsx     # Login page
│   │   │   └── SignUp.jsx    # Registration page
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Handles login
│   │   │   └── ThemeContext.jsx  # Handles dark/light mode
│   │   └── App.jsx           # Main app file
│   └── package.json          # Libraries needed
│
├── backend/                   # Server code (Node.js)
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js       # User data structure
│   │   │   └── Note.js       # Note data structure
│   │   ├── routes/
│   │   │   ├── auth.js       # Sign up & login code
│   │   │   └── notes.js      # Upload & search code
│   │   └── server.js         # Main server file
│   ├── uploads/              # Folder for uploaded files
│   └── package.json          # Libraries needed
│
└── .env                      # Secret keys (passwords, API keys)
```

---

## 🔐 How Security Works

1. **Password Encryption** - Your password is scrambled so nobody can read it, even us.

2. **Login Tokens** - When you log in, you get a secret token. This token proves you're logged in.

3. **File Checking** - We verify uploaded files are safe (PDF, Word, Images only).

4. **File Size Limit** - Maximum 50MB per upload to keep servers running fast.

5. **Private Access** - Only you can delete your notes or see your details.

---

## 📞 How Everything Communicates

**When you upload a file:**
1. Click upload button in your browser
2. Browser sends file to the server
3. Server checks if you're logged in
4. Server saves the file and creates a database record
5. Your browser gets confirmation
6. Your page refreshes showing the new file ✅

**When you search for notes:**
1. Type in the search box
2. Your browser searches instantly (no click needed!)
3. Only matching notes appear on screen
4. Happens live as you type ✅

---


**Status**: ✅ Complete and Working  
**Repository**: https://github.com/bablijaiswal/navnotes
