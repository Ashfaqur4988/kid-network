# Explanation

## Problem Statement

The objective of this backend project is to create a user authentication and management system. The system allows users to register, log in, see user data and admin can manage user roles. It is built using Node.js, Prisma ORM, and PostgreSQL for data storage, with features such as role-based access control (RBAC) and token-based authentication for security.

Key functionalities of the system include:

- **User Registration**: Users can sign up by providing an email and password.
- **User Login**: Registered users can log in using their credentials.
- **User Role Management**: Users with "maintainer" roles are Admin users and Admin users can update the roles of other users.
- **User Data Retrieval**: Users can see their data, users with "cool kid" role can see only its own data, users with "cooler kid" roles see all user's name and country and users with "coolest kid" roles see all user's name, country, email and role. Admin users can retrieve a list of detailed data of users and also can update user roles if necessary.
- **Token-based Authentication**: All routes are protected using JWT tokens, ensuring secure access to the system.

## Technical Specification and Design

### Technologies Used

- **React Js**: Frontend framework for building user interfaces.
- **Node.js**: Backend framework to handle API routes and server management.
- **Express.js**: Framework for building the RESTful API and handling HTTP requests.
- **Prisma ORM**: Object-relational mapping tool for database interaction, specifically with PostgreSQL.
- **JWT**: JSON Web Tokens for secure user authentication and role-based authorization.
- **Bcrypt.js**: Library for hashing user passwords.
- **CORS**: Middleware to enable cross-origin resource sharing between client and server.
- **Cookie-Parser**: To handle cookies for storing authentication tokens.
- **Axios**: For making HTTP requests to external APIs.

### Core Features and Design Flow

1. **User Authentication**:

   - Users register by providing an email and password.
   - Passwords are hashed using bcrypt before being stored in the database.
   - After registration, a JWT token is generated and sent back in a cookie for subsequent authentication.
   - Users can log in by providing their email and password, which are validated against the database and in frontend the state is updated.
   - The JWT token is sent back in a cookie upon successful login.
   - The token is used to authenticate requests to protected routes.
   - All the requests passes through middleware functions to check authentication and authorization.
   - Middleware functions, `protectRoute` and `isAdmin`, ensure that users are authorized before accessing protected routes.
   - The logged in user can see data according to the role they have.
   - On logging out the token is removed from the cookie and in the frontend the state is reset.

2. **Role Management**:

   - Users are assigned "cool kid" role by default.
   - Admin roles can update other users' roles and view all user data.
   - Role-based access control ensures only authorized users can access certain endpoints (e.g., only admins can update roles).

3. **Token-based Authentication and Authorization**:

   - The system uses JWT tokens to authenticate users and protect sensitive routes.
   - Middleware functions, `protectRoute` and `isAdmin`, ensure that users are authorized before accessing protected routes.
   - The tokens are stored in cookies to maintain session persistence across requests.

4. **Database Schema**:

   - The database schema uses Prisma to define the `User` model, including fields for `id`, `email`, `password`, `firstName`, `lastName`, `country`, `role`, and `createdAt`.
   - PostgreSQL is used as the database for storing and retrieving user data.

5. **Frontend data fetching**:

   - The frontend makes API requests to the backend to fetch user data using `axios` library.
   - The user data and all users data are then displayed in the frontend.

6. **State Management**:

   - The frontend uses Zustand (light weight state management library) for state management, which is then connected to the backend to fetch and update user data.

7. **React Router**:
   - The frontend uses React Router to handle routing and navigation within the application.

## Technical Decisions and Rationale

- **JWT for Authentication**: Using JWT tokens provides a stateless authentication mechanism that is scalable and secure. Storing tokens in cookies helps maintain the user's session.
- **Prisma ORM**: Chose Prisma over raw SQL queries for better maintainability, type safety, and ease of querying. It integrates smoothly with PostgreSQL.
- **Bcrypt for Password Hashing**: Bcrypt is a widely used and secure algorithm for hashing passwords, which is crucial for protecting sensitive user data.
- **Role-Based Access Control (RBAC)**: The user roles and permissions system ensures that only authorized users (e.g., admins) can modify certain data, maintaining a secure and structured flow.
- **Winston**: Winston is a popular logging library for Node.js, which is used for logging errors and actions. For the logging of all the actions and errors, Winston is used.
- **Axios for Data Fetching**: Axios is a popular library for making HTTP requests, which is used for fetching user data during registration.
- **React Router**: React Router is used for handling routing and navigation within the application.
- **Zustand**: Zustand is a light-weight state management library that is well-suited for handling complex state management in the frontend.

## User Story Fulfillment

The solution effectively achieves the desired outcome of managing user registration, authentication, and role management as described in the user story.

- **User Registration and Login**: The system allows users to register with an email and password, and logs them in by verifying the credentials. It generates JWT tokens that provide secure access to the application.
- **Role-based User Management**: Admin users can manage other users' roles, ensuring that sensitive actions are restricted based on user roles. Users with role "cool kid" can see their won data, users with "cooler kid" can see all user's name and country, and users with "coolest kid" can see all user's name, country, email and role.
- **Session Persistence**: Using JWT tokens stored in cookies ensures that the user's session is persistent and secure across requests.
- **Error Handling and Logging**: The system logs errors and actions, providing clear feedback for debugging and monitoring.

## Scope for Improvement

1. **Password Reset Feature**: Implementing a password reset functionality would add an extra layer of usability for users who forget their passwords. This can be done by sending a reset link via email.

2. **Enhanced Security**:

   - **Rate Limiting**: Adding rate limiting for authentication routes would help prevent brute-force attacks.
   - **Two-Factor Authentication (2FA)**: Implementing 2FA could provide an additional layer of security for user accounts, especially for admins.

3. **Data Validation**: Currently, basic validation is being done (e.g., checking for an existing user during registration), but more robust validation (e.g., validating email formats, password strength) could be added to ensure the quality of data.

4. **API Rate Limiting and Throttling**: Adding rate limiting and throttling on login and sensitive routes would help prevent abuse and improve the security of the application.

5. **Error Handling**: Improving the error handling system to provide more detailed messages and context in the logs (e.g., logging specific request data when an error occurs) could be helpful for debugging and improving user experience.

6. **Performance Optimization**: Optimize the performance of the application by using caching.

7. **Refresh Token**: Implementing a refresh token would be more secure, as it provides an additional layer of authentication.
