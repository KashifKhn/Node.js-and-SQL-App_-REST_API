# Node.js and SQL App Documentation

## Overview

This documentation provides an overview of a Node.js application that uses the Express framework and MySQL database. The application allows users to manage a simple user database with CRUD (Create, Read, Update, Delete) operations.

## Prerequisites

Ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/KashifKhn/SQL_Node_CURD_Operation.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the MySQL database:

   - Create a database named `delta_app`.
   - Update the `user` and `password` in the `connection` object inside `app.js` according to your MySQL configuration.

4. Run the application:

   ```bash
   npm run dev (if nodemon are installed )
   ```

   The server will be running on `http://localhost:3000`.

## Features

### 1. Home Page

- URL: `/`
- Displays the total number of users in the database.

### 2. Insert Random Users

- URL: `/users/insert/random`
- Inserts 100 random users into the database.

### 3. View All Users

- URL: `/users`
- Displays a list of all users with their IDs, names, and emails.

### 4. Add New User

- URL: `/users/new`
- Displays a form to add a new user.

### 5. View User Details

- URL: `/users/:id`
- Displays details of a specific user based on the provided ID.

### 6. Delete User

- URL: `/users/:id/delete`
- Allows the user to delete a specific user.

### 7. Edit User

- URL: `/users/:id/edit`
- Allows the user to edit the details of a specific user.

## API Endpoints

- **GET** `/users/:id`: Retrieve user details.
- **POST** `/users`: Add a new user.
- **DELETE** `/users/:id`: Delete a user.
- **PATCH** `/users/:id`: Update user details.

## Note

- This application uses the EJS template engine for rendering views.
- Passwords are stored in plain text in this example. In a real-world scenario, it is recommended to hash passwords before storage.

## Authors

- @KashifKhn  
- <kashifkhnx04@gmail.com>

## License

This project is licensed under the [MIT License](LICENSE).
