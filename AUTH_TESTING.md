# Authentication Testing Guide

This document provides instructions to test the authentication system for OutfitHub.

## Prerequisites

1. **MySQL Server** running on localhost:3306
2. **Node.js** (v20.19.0 or >=22.12.0)
3. Dependencies installed: `npm install`

## Setup

### 1. Create `.env` file

Create a `.env` file in the project root:

```env
# API Configuration
API_PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_DATABASE=outfithub
```

Adjust database credentials as needed for your MySQL setup.

### 2. Start MySQL

Ensure your MySQL server is running and the database `outfithub` exists.

## Running the Application

### Terminal 1: Start the Backend Server

```bash
npm run server
```

Expected output:

```.env
API Listening on port: 3001
Database connectivity OK: true
```

### Terminal 2: Start the Frontend Dev Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port shown in console).

## Testing Authentication

### Via Browser UI

1. **Register a new account:**
   - Navigate to `http://localhost:5173/register`
   - Fill in the registration form
   - Click Register
   - You should see a success message

2. **Login:**
   - Navigate to `http://localhost:5173/login`
   - Enter your username and password
   - Click Login
   - You should be redirected to the home page if successful

### Via API (cURL)

#### Register

```bash
curl -X POST http://localhost:3001/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "data": {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123",
      "confirmPassword": "password123"
    }
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Registered successfully",
  "payload": null
}
```

#### Login

```bash
curl -X POST http://localhost:3001/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "login",
    "data": {
      "username": "testuser",
      "password": "password123"
    }
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Login successful",
  "payload": {
    "userId": "1",
    "accessToken": "abc123...",
    "refreshToken": "xyz789...",
    "expiresAt": 1705123456789
  }
}
```

#### Refresh Token

```bash
curl -X POST http://localhost:3001/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "refreshToken",
    "data": {
      "userId": "1",
      "refreshToken": "xyz789..."
    }
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Token refreshed",
  "payload": {
    "userId": "1",
    "accessToken": "new123...",
    "refreshToken": "newxyz...",
    "expiresAt": 1705123456789
  }
}
```

## Running Unit Tests

```bash
npm run test:unit
```

This runs the test suite for the authentication store and views.

## Troubleshooting

### "Cannot GET /api/auth"

- Ensure the backend server is running on port 3001
- Check that vite proxy is configured in `vite.config.ts`

### "Database connectivity failed"

- Verify MySQL is running
- Check `.env` file credentials
- Ensure the `outfithub` database exists

### "Invalid credentials"

- User doesn't exist in database
- Password is incorrect
- Check MySQL `users` table for the account

### Session not persisting

- Browser may be blocking localStorage
- Check browser console for errors
- Ensure sessionStorage/localStorage is enabled

## Key Files

- **Frontend:** `src/feature/auth/` - Auth store, services, views
- **Backend:** `server/` - API routes, services, database
- **Shared:** `shared/interfaces/` - TypeScript interfaces for auth
- **Config:** `.env` - Environment variables
- **Tests:** `src/feature/auth/tests/` - Unit tests
