# Learn API App

A full-stack learning application demonstrating modern web development with React, Node.js, and RESTful API design.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- Two terminal windows for simultaneous frontend and backend execution

### Port Configuration
- **Backend API:** `http://localhost:5000`
- **Frontend App:** `http://localhost:5173`

### Running Both Components Simultaneously

You'll need **two separate terminal windows** to run both the backend and frontend at the same time.

#### Terminal 1 - Backend Server

```bash
cd backend
npm install
node server.js
```

The backend API will start on **port 5000**. You should see:
```
Server is running on http://localhost:5000
```

#### Terminal 2 - Frontend Application

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **port 5173**. You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

### Accessing the Application

Once both servers are running, open your browser and navigate to:
- **Application UI:** http://localhost:5173
- **API Health Check:** http://localhost:5000

---

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

All API responses use `Content-Type: application/json`

### Users Endpoints

#### `GET /api/users`
Retrieve all users.

**Response:** `200 OK`
```json
[
  { "id": 1, "name": "John Doe", "role": "QA Engineer" }
]
```

#### `POST /api/users`
Create a new user.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "role": "Developer"
}
```

**Responses:**
- `201 Created` - User created successfully
  ```json
  { "id": 2, "name": "Jane Smith", "role": "Developer" }
  ```
- `400 Bad Request` - Missing required fields
  ```json
  { "error": "Missing required fields: name and role are required" }
  ```

### Roles Endpoints

#### `GET /api/roles`
Retrieve all roles.

**Response:** `200 OK`
```json
[
  { "id": 1, "title": "QA Engineer", "department": "Testing" }
]
```

#### `POST /api/roles`
Create a new role.

**Request Body:**
```json
{
  "title": "Backend Developer",
  "department": "Engineering"
}
```

**Responses:**
- `201 Created` - Role created successfully
  ```json
  { "id": 2, "title": "Backend Developer", "department": "Engineering" }
  ```
- `400 Bad Request` - Missing required fields
  ```json
  { "error": "Missing required fields: title and department are required" }
  ```

#### `DELETE /api/roles/:id`
Delete a role by ID.

**Responses:**
- `200 OK` - Role deleted successfully
  ```json
  { "message": "Role deleted successfully", "role": {...} }
  ```
- `403 Forbidden` - Attempting to delete protected default role (id: 1)
  ```json
  { "error": "System default resources cannot be deleted" }
  ```
- `404 Not Found` - Role not found
  ```json
  { "error": "Role not found" }
  ```

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

## 🧪 Testing the API

You can test the API using PowerShell, curl, or any API client:

**PowerShell Example:**
```powershell
# Get all users
Invoke-RestMethod -Uri http://localhost:5000/api/users -Method Get

# Create a new user
Invoke-RestMethod -Uri http://localhost:5000/api/users -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"Bob Wilson","role":"Designer"}' | ConvertTo-Json
```

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

### Wymagania wstępne
- **Node.js** (v14 lub wyższy)
- **npm** (v6 lub wyższy)
- Dwa okna terminala do równoczesnego uruchomienia frontendu i backendu

### Konfiguracja portów
- **Backend API:** `http://localhost:5000`
- **Frontend:** `http://localhost:5173`

### Uruchomienie obu komponentów jednocześnie

Potrzebujesz **dwóch osobnych okien terminala**.

#### Terminal 1 - Serwer Backend

```bash
cd backend
npm install
node server.js
```

#### Terminal 2 - Aplikacja Frontend

```bash
cd frontend
npm install
npm run dev
```

### Dostęp do aplikacji

Otwórz przeglądarkę i przejdź do:
- **Interfejs aplikacji:** http://localhost:5173
- **API:** http://localhost:5000

---

## 📝 License

This project is for learning purposes.