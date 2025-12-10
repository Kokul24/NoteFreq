# NoteFreq

**Your Ideas, Organized** 📝

NoteFreq is a modern, full-stack note-taking application built with the MERN stack. Create, manage, and organize your thoughts with a beautiful and intuitive interface.

## 🎥 Live Demo

**[Watch Live Demo Video](https://drive.google.com/file/d/19_a2Hh8-bZtZZQ_CUkiPHpK5uo1F7zxt/view?usp=sharing)**

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- 📝 **Rich Note Management** - Create, read, update, and delete notes
- 🎨 **Beautiful UI** - Colorful gradient cards with smooth animations
- 🔍 **Smart Search** - Quick search through notes with modal popup interface
- 💪 **Password Strength Indicator** - Real-time feedback for strong password creation
- 👁️ **Password Visibility Toggle** - Show/hide password feature
- 🌙 **Stunning Login Page** - Illustrated landscape with frosted glass design
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🚀 **Real-time Updates** - Instant UI updates with toast notifications
- 🎯 **User-Specific Notes** - Each user has their own private notes

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git



Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Usage

1. **Register** - Create a new account with username, email, and password
2. **Login** - Sign in with your credentials
3. **Create Notes** - Click the + button to create a new note
4. **Search** - Use the search button to find notes quickly
5. **Edit/Delete** - Click on any note to edit or delete it
6. **Logout** - Click the logout button when done

## 📁 Project Structure

```
NoteFreq/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── notesControllers.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Notes.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── notesRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── NotesList.jsx
│   │   │   ├── NoteEditor.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ConfirmModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🎨 Features Showcase

### Authentication
- Secure registration with password strength validation
- JWT-based authentication
- Protected routes
- Password visibility toggle

### Note Management
- Colorful gradient cards (6 color themes)
- Real-time search functionality
- Create, edit, and delete notes
- User-specific note filtering

### UI/UX
- Frosted glass login page with illustrated landscape
- Custom toast notifications
- Confirmation modals
- Smooth animations and transitions
- Mobile-responsive design

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- User-specific data access
- Secure HTTP-only considerations

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kokul**
- GitHub: [@Kokul24](https://github.com/Kokul24)

## 🙏 Acknowledgments

- Built with MERN stack
- Inspired by modern note-taking applications
- UI design inspired by glassmorphism trends

---

**NoteFreq** - Organize your thoughts, one note at a time! 📝✨
