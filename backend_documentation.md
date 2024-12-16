# Backend API Documentation

## Overview

This backend is built using Express.js, Prisma, and JWT for user authentication. It provides routes for user registration, login, and managing user roles. The app uses a PostgreSQL database, and middleware is implemented for route protection and admin verification.

---

## Environment Setup

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Set up the `.env` file for environment variables:
   ```env
   DATABASE_URL=your_postgresql_database_url
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### `POST /register`

- **Description**: Register a new user.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "country": "USA",
    "role": "cool kid"
  }
  ```

#### `POST /login`

- **Description**: Login with email and password.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "country": "USA",
    "role": "cool kid"
  }
  ```

#### `POST /logout`

- **Description**: Logout the user by clearing the JWT cookie.
- **Response**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

#### `GET /get-logged-in-user`

- **Description**: Get the details of the logged-in user.
- **Response**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "country": "USA",
    "role": "cool kid"
  }
  ```

---

### User Management Routes (`/api/users`)

#### `GET /get-all-users`

- **Description**: Get all users (except the logged-in user).
- **Response**:
  ```json
  [
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "country": "Canada"
    },
    {
      "firstName": "Bob",
      "lastName": "Johnson",
      "country": "UK"
    }
  ]
  ```

#### `GET /get-all-users-details`

- **Description**: Get all users' details for authorized roles (`coolest kid`, `maintainer`).
- **Response**:
  ```json
  [
    {
      "id": "user_id",
      "firstName": "Jane",
      "lastName": "Smith",
      "country": "Canada",
      "email": "jane.smith@example.com",
      "role": "cool kid"
    },
    {
      "id": "user_id",
      "firstName": "Bob",
      "lastName": "Johnson",
      "country": "UK",
      "email": "bob.johnson@example.com",
      "role": "cooler kid"
    }
  ]
  ```

#### `PATCH /change-role`

- **Description**: Update a user's role (requires admin).
- **Body**:
  ```json
  {
    "newRole": "cooler kid",
    "userId": "user_id"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user_id",
    "role": "cooler kid"
  }
  ```

---

## Middleware

### `protectRoute`

This middleware ensures that the route is protected and only accessible to users with a valid JWT token. It adds `userId` and `userRole` to the request object.

### `isAdmin`

This middleware checks if the logged-in user has the `maintainer` role. It is used to secure routes that should only be accessible by administrators.

---

## Utilities

### `fakeUserGenerator`

Generates fake user data using the `randomuser.me` API. It returns a fake first name, last name, and country.

### `generateToken`

Generates a JWT token for the user with their `userId` and `userRole`.

### `setCookie`

Sets the JWT token in a cookie for secure session management.

---

## Prisma Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  country   String
  role      String
  createdAt DateTime @default(now())
}
```

---

## Running the App

1. Start the app in development:

   ```bash
   npm run dev
   ```

2. Start the app in production:
   ```bash
   npm start
   ```

---

## Notes

- This backend is designed to work with a PostgreSQL database.
- The frontend is expected to make requests to the backend running on `https://kid-network.onrender.com`.
- Make sure to configure the `.env` file properly for secure and efficient operation.
