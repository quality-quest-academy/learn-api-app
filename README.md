# learn-api-app

## English
A simple Node.js API application for learning purposes.

### Getting Started

**Backend:**
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`

### API Endpoints
- `GET /api/users` - Get all users
- `POST /api/users` - Create user (requires `name` and `role`)
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create role (requires `title` and `department`)
- `DELETE /api/roles/:id` - Delete role (id: 1 is protected)

---

## Polski
Prosta aplikacja API Node.js do nauki.

### Uruchomienie

**Backend:**
```bash
cd backend
npm install
npm start
```
Serwer działa na `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Aplikacja działa na `http://localhost:5173`

### Endpointy API
- `GET /api/users` - Pobierz użytkowników
- `POST /api/users` - Utwórz użytkownika (wymaga `name` i `role`)
- `GET /api/roles` - Pobierz role
- `POST /api/roles` - Utwórz rolę (wymaga `title` i `department`)
- `DELETE /api/roles/:id` - Usuń rolę (id: 1 jest chronione)