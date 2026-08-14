# 🚀 AI-Powered Task Manager

A full-stack task management application with JWT authentication, task
CRUD operations, search/filter/sort functionality, and an AI-powered
task assistant using Google Gemini.

## 🌐 Live Demo

**Frontend:** https://ai-powered-task-manager-eta.vercel.app/

**Backend API:** https://task-management-backend-qpfk.onrender.com/

## ✨ Features

-   🔐 User registration and login
-   🔑 JWT-based authentication
-   👤 User-specific dashboard and tasks
-   ➕ Create tasks
-   ✏️ Edit tasks
-   ✅ Mark tasks as completed
-   🗑️ Delete tasks
-   🔎 Search tasks
-   🎯 Filter tasks by status and priority
-   📅 Task due dates
-   📊 Dashboard task statistics
-   🤖 AI Task Assistant powered by Google Gemini
-   📝 Markdown-formatted AI responses
-   🔗 GitHub and LinkedIn links
-   📱 Responsive UI
-   🚀 Production deployment with Vercel and Render

## 🛠️ Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Axios
-   React Router
-   React Markdown

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcrypt
-   Google Gemini API

### Deployment

-   Vercel --- Frontend
-   Render --- Backend
-   MongoDB Atlas --- Database

## 🏗️ Architecture

``` text
React + Vite Frontend
        │
        │ REST API
        ▼
Node.js + Express Backend
        │
        ├──────────────► MongoDB Atlas
        │
        └──────────────► Google Gemini API
```

## 📂 Project Structure

``` text
Task Management/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔐 Authentication

The application uses JWT authentication.

``` text
Register/Login
      ↓
Backend validates credentials
      ↓
JWT token generated
      ↓
Frontend stores the token
      ↓
Authenticated API requests
```

Passwords are hashed using `bcrypt` before being stored in MongoDB.

## 🤖 AI Task Assistant

The AI assistant uses Google Gemini to answer questions using the user's
task data.

Example questions:

``` text
What are my pending tasks?
Summarize my tasks
Which tasks have high priority?
What should I work on first?
```

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside `backend/`:

``` env
PORT=4002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your `.env` file to GitHub.

### Frontend

Configure the backend URL in:

``` text
frontend/src/api/url.js
```

Example:

``` js
const BACKEND_URL = "https://your-backend-url.com";

export default BACKEND_URL;
```

## ▶️ Run Locally

### 1. Clone the repository

``` bash
git clone https://github.com/harsh123singj/AI-Powered-Task-Manager.git
cd AI-Powered-Task-Manager
```

### 2. Start the backend

``` bash
cd backend
npm install
npm start
```

### 3. Start the frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

The frontend normally runs on:

``` text
http://localhost:5173
```

## 🔌 API Overview

### Authentication

``` text
POST /api/auth/register
POST /api/auth/login
```

### Tasks

``` text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### AI

``` text
POST /api/ai/test
```

Authenticated routes require the JWT token in the request headers.

## 👨‍💻 Author

**Harsh Singh**

-   GitHub: https://github.com/harsh123singj
-   LinkedIn: https://www.linkedin.com/in/harsh-singh-b44575327/

## 📄 License

This project is created for learning, portfolio, and demonstration
purposes.
