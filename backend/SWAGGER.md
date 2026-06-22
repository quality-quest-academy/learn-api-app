# Swagger/OpenAPI Documentation

This API now includes Swagger/OpenAPI documentation for easy exploration and testing of endpoints.

## Accessing Swagger UI

When the backend server is running, you can access the interactive Swagger UI at:

**http://localhost:5000/api-docs**

## Features

- **Interactive API Documentation**: Browse all available endpoints with detailed descriptions
- **Try It Out**: Test API endpoints directly from the browser
- **Request/Response Schemas**: View expected request bodies and response formats
- **Parameter Documentation**: See required and optional parameters for each endpoint

## Available Endpoints

### Health Check
- **GET /** - Check if the API is running

### Users
- **GET /api/users** - Get all users
- **POST /api/users** - Create a new user

### Roles
- **GET /api/roles** - Get all roles
- **POST /api/roles** - Create a new role
- **DELETE /api/roles/{id}** - Delete a role by ID

## Using Swagger UI

1. Start the backend server: `npm start` (from the backend directory)
2. Open your browser to http://localhost:5000/api-docs
3. Click on any endpoint to expand its documentation
4. Click "Try it out" to test the endpoint
5. Fill in any required parameters or request body
6. Click "Execute" to send the request
7. View the response below

## OpenAPI Specification

The OpenAPI 3.0 specification is automatically generated from JSDoc comments in the code. To view the raw JSON specification, visit:

**http://localhost:5000/api-docs.json**

## Modifying Documentation

To update the API documentation, edit the JSDoc comments in `server.js` following the Swagger/OpenAPI specification format. The documentation will be automatically regenerated when the server restarts.
