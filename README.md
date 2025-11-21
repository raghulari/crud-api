# REST API Backend with JWT Authentication

This repository contains a modular and production-ready REST API backend implemented with Node.js, Express.js, and MongoDB (via Mongoose). The backend provides complete product management functionality (CRUD) and a secure authentication workflow powered by JSON Web Tokens (JWT). Sensitive configuration values, including database credentials and signing secrets, are stored in environment variables to ensure proper security practices.

---

## Overview

The system is organized into two primary functional components:

### 1. Authentication and Access Control
- User registration with server-side validation  
- Password hashing using bcrypt  
- Login using either username or email  
- Token-based authentication using JWT  
- Protected API endpoints requiring valid authentication tokens  

### 2. Product Management (CRUD)
- Create new products  
- Retrieve all products or a specific product by ID  
- Update existing product records  
- Delete products  
- All operations restricted to authenticated users  

This architecture ensures a clear separation of concerns and supports scalability and maintainability.

---

## Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JSON Web Token (JWT)  
- bcryptjs  
- dotenv  
