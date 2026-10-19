# Role-Based User Management API

A secure REST API built with **Node.js, Express.js, MongoDB, and JWT authentication** that provides user registration, login, role-based authorization, user management, account blocking, and admin promotion.

Developed as part of the **Syntecxhub Internship — Week 4 Project**.

## Features

- **User Registration:** Register users with unique usernames and email addresses.
- **Secure Authentication:** Hash passwords using bcryptjs and authenticate users using JSON Web Tokens (JWT).
- **Role-Based Access Control:** Separate permissions for `user` and `admin` roles.
- **User Management:** Allow administrators to retrieve the list of registered users.
- **User Promotion:** Allow administrators to promote normal users to administrators.
- **Account Blocking:** Allow administrators to block user accounts.
- **Blocked Account Protection:** Prevent blocked users from logging in or accessing protected endpoints, including with previously issued tokens.
- **Input Validation:** Validate required fields, username length, password length, and user IDs.
- **Password Protection:** Exclude password hashes from user management responses.
- **Environment Configuration:** Keep database credentials and JWT secrets in environment variables.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| dotenv | Environment variable management |
| Nodemon | Development server auto-restart |
| Postman | API testing |

## Project Structure

```text
Syntecxhub_Role_Based_User_Management_API/
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   └── authController.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   └── User.js
├── routes/
│   ├── adminRoutes.js
│   └── authRoutes.js
├── .env                 # Local environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Postman](https://www.postman.com/) for testing API requests

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Dimoriuspietersz/Syntecxhub_Role_Based_User_Management_API.git
cd Syntecxhub_Role_Based_User_Management_API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
```

Replace the placeholder values with your own MongoDB connection string and a strong, randomly generated JWT secret.

**Security note:** Never commit your `.env` file, database credentials, or JWT secret to GitHub.

### 4. Start the development server

```bash
npm run dev
```

To start the application without Nodemon:

```bash
npm start
```

The API will run at:

`http://localhost:5000`

A successful startup should display messages confirming the MongoDB connection and server startup.

## API Endpoints

All endpoints use the base URL:

`http://localhost:5000`

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Health check | Public |
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Authenticate a user and obtain a JWT | Public |

#### Register a user

**POST** `/api/auth/register`

Request body:

```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "TestUser123"
}
```

Newly registered users receive the `user` role by default. Public registration does not allow users to assign themselves the admin role.

#### Log in

**POST** `/api/auth/login`

Request body:

```json
{
  "email": "testuser@example.com",
  "password": "TestUser123"
}
```

A successful response includes a JWT token and user details. Use the token to authenticate requests to protected endpoints.

### Administrator Endpoints

These endpoints require a valid JWT belonging to an active administrator.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | Retrieve all users |
| PATCH | `/api/admin/users/:id/promote` | Promote a user to admin |
| PATCH | `/api/admin/users/:id/block` | Block a user account |

Replace `:id` with the target user's MongoDB document ID.

#### Authorization header

For protected requests, include:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

In Postman, this can be configured through **Authorization → Bearer Token**.

The API excludes password hashes from administrator user-list and user-management responses.

## Roles and Permissions

| Capability | User | Admin |
|---|:---:|:---:|
| Register an account | Yes | Yes |
| Log in | Yes, if not blocked | Yes, if not blocked |
| Retrieve all users | No | Yes |
| Promote another user | No | Yes |
| Block another user | No | Yes |

Administrators are created through a controlled administrative setup process. For initial setup, an existing user's role can be updated directly in MongoDB Atlas by an authorized database administrator.

## Security Measures

- Passwords are hashed using bcryptjs before storage.
- JWTs are signed using a secret configured through environment variables.
- Authentication middleware validates JWTs before protected requests.
- Role middleware enforces administrator-only permissions.
- The current account status is checked against MongoDB on protected requests.
- Blocked accounts cannot log in or use existing tokens to access protected routes.
- Public registration assigns the default `user` role.
- User passwords are excluded from API responses.
- Invalid user IDs and duplicate usernames or email addresses are handled.

## Testing

The API can be tested using Postman.

The following scenarios have been tested during development:

- Successful user registration.
- Successful login and JWT generation.
- Rejection of unauthorized access to administrator endpoints.
- Successful retrieval of users by an administrator.
- Successful promotion of a user to admin.
- Successful blocking of a user.
- Rejection of login attempts from blocked accounts.
- Rejection of existing tokens belonging to blocked accounts.
- Rejection of invalid JWT tokens.

## HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | User registered successfully |
| `400 Bad Request` | Invalid input or request |
| `401 Unauthorized` | Missing, invalid, or expired authentication token |
| `403 Forbidden` | Insufficient permissions or blocked account |
| `404 Not Found` | Requested resource does not exist |
| `409 Conflict` | Username or email already exists |
| `500 Internal Server Error` | Unexpected server error |

## Future Improvements

- Add pagination and filtering to the user list.
- Add an endpoint to unblock users.
- Implement rate limiting and stricter request validation.
- Add automated unit and integration tests.
- Add administrator audit logs for sensitive operations.
- Introduce refresh-token management and account recovery.

## Author and Repository

**Project:** Role-Based User Management API  
**Internship:** Syntecxhub — Week 4

**GitHub Repository:**  
https://github.com/Dimoriuspietersz/Syntecxhub_Role_Based_User_Management_API

---

This project demonstrates backend development concepts including REST API design, database integration, password hashing, JWT authentication, middleware, and role-based access control.
