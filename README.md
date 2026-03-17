# Node.js Auth System

Auth system built with Node.js, Express, Prisma, and PostgreSQL. This project implements a secure authentication flow including user registration, login, password hashing with bcrypt, and JWT-based authentication. The goal of this project is to practice backend architecture, API design, and authentication best practices.

## 🚀 Technologies

* **Node.js & Express:** Server and API routing.
* **PostgreSQL:** Relational database (hosted on Neon.tech).
* **Prisma:** Next-generation Node.js and TypeScript ORM.
* **Bcrypt:** Library to help hash passwords.
* **JSON Web Token (JWT):** Secure transmission of information between parties as a JSON object.

## ✨ Features

* **User Registration:** Secure account creation with password hashing.
* **User Login:** Authenticates users and generates a JWT.
* **Protected Routes:** Middleware to verify JWT validity.
* **Authorization (Ownership):** Users can only retrieve, update, or delete their own data based on the token ID, ensuring data privacy.

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed [Node.js](https://nodejs.org/en/).
* You have a PostgreSQL database running (or an account on Neon.tech).

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_key_here"
```

## 📦 Installation & Setup

1. Clone the repository:
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
```

2. Install the dependencies:
```bash
npm install
```

3. Run Prisma migrations to set up the database schema:
```bash
npx prisma migrate dev
```

4. Start the server:
```bash
npm run dev
```

## 🛣️ API Endpoints

### Public Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users` | Registers a new user. Requires `userName`, `userEmail`, and `password`. |
| `POST` | `/api/users/login` | Authenticates a user and returns a JWT. Requires `userEmail` and `password`. |

### Protected Routes (Requires Bearer Token)
*All protected routes require the JWT to be sent in the `Authorization` header as `Bearer <token>`.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Retrieves the profile data of the currently authenticated user. |
| `PUT` | `/api/users/profile` | Updates the profile data of the currently authenticated user. |
| `DELETE` | `/api/users/profile` | Deletes the account of the currently authenticated user. |

---
*Developed as a study project for modern backend architecture.*
