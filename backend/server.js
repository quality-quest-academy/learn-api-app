const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 5000;

// In-memory data store
let users = [
  { id: 1, name: "John Doe", role: "QA Engineer" }
];

let roles = [
  { id: 1, title: "QA Engineer", department: "Testing" }
];

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiter for all /api routes: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', apiLimiter);

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

// GET /api/users - Return all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST /api/users - Create a new user with validation and memory protection
app.post('/api/users', (req, res) => {
  const { name, role } = req.body;

  // Validate required fields
  if (!name || !role) {
    return res.status(400).json({ 
      error: 'Missing required fields: name and role are required' 
    });
  }

  // Memory protection: Remove oldest user (except default seed user) if limit reached
  if (users.length >= 20) {
    // Find the first user that is not the default seed user (id: 1)
    const indexToRemove = users.findIndex(user => user.id !== 1);
    if (indexToRemove !== -1) {
      users.splice(indexToRemove, 1);
    }
  }

  // Create new user with auto-incrementing id
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    role
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// GET /api/roles - Return all roles
app.get('/api/roles', (req, res) => {
  res.json(roles);
});

// POST /api/roles - Create a new role with validation and memory protection
app.post('/api/roles', (req, res) => {
  const { title, department } = req.body;

  // Validate required fields
  if (!title || !department) {
    return res.status(400).json({ 
      error: 'Missing required fields: title and department are required' 
    });
  }

  // Memory protection: Remove oldest role (except default seed role) if limit reached
  if (roles.length >= 20) {
    // Find the first role that is not the default seed role (id: 1)
    const indexToRemove = roles.findIndex(role => role.id !== 1);
    if (indexToRemove !== -1) {
      roles.splice(indexToRemove, 1);
    }
  }

  // Create new role with auto-incrementing id
  const newRole = {
    id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
    title,
    department
  };

  roles.push(newRole);

  res.status(201).json(newRole);
});

// DELETE /api/roles/:id - Delete a role by id (except default role)
app.delete('/api/roles/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Block deletion of the default role (id: 1)
  if (id === 1) {
    return res.status(403).json({ 
      error: 'System default resources cannot be deleted' 
    });
  }

  // Find the role index
  const roleIndex = roles.findIndex(role => role.id === id);

  if (roleIndex === -1) {
    return res.status(404).json({ error: 'Role not found' });
  }

  // Remove the role
  const deletedRole = roles.splice(roleIndex, 1)[0];

  res.json({ message: 'Role deleted successfully', role: deletedRole });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
