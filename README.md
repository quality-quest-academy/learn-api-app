# Learn API App

A full-stack learning application demonstrating modern web development with React, Node.js, and RESTful API design.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation
```bash
npm run install:all
```

### Start Development
```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 5173).

## 📋 Features

### Frontend
- **React 18** with modern hooks (useState, useEffect)
- **React Router** for SPA navigation (Home, Users, Roles pages)
- **Tailwind CSS** for responsive, modern UI
- **Vite** for fast development and building
- **Form validation** with error handling

### Backend
- **Express.js** RESTful API
- **CORS** enabled for cross-origin requests
- **Rate limiting** (100 requests per 15 minutes)
- **In-memory data store** with automatic memory management
- **Input validation** with comprehensive error responses

---

## 🔌 API Documentation

### 📚 Interactive Swagger/OpenAPI Documentation

The API includes **interactive Swagger documentation** for easy exploration and testing:

**🌐 Swagger UI:** http://localhost:5000/api-docs

Features:
- **Try It Out**: Test all endpoints directly from your browser
- **Request/Response Schemas**: View expected data formats
- **Parameter Documentation**: See all required and optional parameters
- **OpenAPI 3.0 Specification**: Industry-standard API documentation

For more details, see [backend/SWAGGER.md](backend/SWAGGER.md)

---

## 🛡️ Code Quality & Validation

### Frontend Validation ✅
- All `useEffect` hooks use proper dependency arrays
- No infinite loop cycles detected
- API calls execute only on component mount or user actions
- Error handling implemented for all network requests

### Backend Validation ✅
- All endpoints return explicit HTTP status codes (200, 201, 400, 403, 404)
- All responses use `application/json` content-type
- Input validation on all POST endpoints
- Memory protection with automatic cleanup (max 20 items per resource)

---

## 📁 Project Structure

```
learn-api-app/
├── backend/
│   ├── server.js          # Express API server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app component with routing
│   │   ├── components/    # Reusable components (Layout, Navbar)
│   │   └── pages/         # Page components (Home, Users, Roles)
│   ├── index.html
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md              # This file
```

---

## Polski 🇵🇱

### Wymagania
- **Node.js** (v14 lub wyższy)
- **npm** (v6 lub wyższy)

### Instalacja
```bash
npm run install:all
```

### Uruchomienie
```bash
npm run dev
```

Uruchamia backend (port 5000) i frontend (port 5173).

### Dostęp
- **Aplikacja:** http://localhost:5173
- **API:** http://localhost:5000
- **Dokumentacja API:** http://localhost:5000/api-docs

---

## 📝 License

This project is for learning purposes.