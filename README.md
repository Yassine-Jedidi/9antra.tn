# Technical Test 9antra.tn

A modern web application for managing and displaying online courses built for a technical test for an internship application. Built with React, TypeScript, Node.js, Express, and MongoDB.

## Demo Video

https://drive.google.com/file/d/1Jmc8S20S3CDGFYJyTHeFn-8IvMh-_hGt/view?usp=sharing

## 🚀 Features

### Frontend

- Modern and responsive UI built with React and TypeScript
- Course catalog with dynamic loading
- Admin panel for course management
- Contact form for user inquiries (just a dummy form)
- Responsive design for all devices
- Image upload and preview functionality

### Backend

- RESTful API built with Express and TypeScript
- MongoDB integration for data persistence
- File upload handling with Multer
- CORS enabled for frontend integration
- Error handling and validation

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Multer for file uploads
- CORS for cross-origin requests

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course
- `PATCH /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── uploads/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

## 🔒 Environment Variables

### Backend

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
