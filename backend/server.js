const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learn API App',
      version: '1.0.0',
      description: 'A simple Express API for managing users and roles',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: process.env.PUBLIC_URL || '/',
        description: 'Current server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'role'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated user ID'
            },
            name: {
              type: 'string',
              description: 'User name'
            },
            role: {
              type: 'string',
              description: 'User role'
            }
          }
        },
        Role: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated role ID'
            },
            title: {
              type: 'string',
              description: 'Role title'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, 'server.js')] // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// In-memory data store
let users = [
  { id: 1, name: "John Doe", role: "QA Engineer" }
];

let roles = [
  { id: 1, title: "QA Engineer" }
];

// Middleware
app.use(express.json());
app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiter for all /api routes: max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', apiLimiter);

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a simple message to confirm the API is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API is running successfully
 */
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with name and role (max 20 users, oldest non-default users removed if limit reached)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith
 *               role:
 *                 type: string
 *                 example: Developer
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     description: Retrieve a list of all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
app.get('/api/roles', (req, res) => {
  res.status(200).json(roles);
});

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role with title (max 20 roles, oldest non-default roles removed if limit reached)
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Senior Developer
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/roles', (req, res) => {
  const { title } = req.body;

  // Validate required fields
  if (!title) {
    return res.status(400).json({ 
      error: 'Missing required fields: title is required' 
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
    title
  };

  roles.push(newRole);

  res.status(201).json(newRole);
});

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     description: Delete a role by ID (system default role with ID 1 cannot be deleted)
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID to delete
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role deleted successfully
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *       403:
 *         description: Cannot delete system default role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

  res.status(200).json({ message: 'Role deleted successfully', role: deletedRole });
});

// Serve static frontend build
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// SPA fallback — must be after all API routes and Swagger
// Regex excludes /api/* and /api-docs to avoid intercepting API/Swagger requests
app.get(/^\/(?!api\/|api-docs).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
