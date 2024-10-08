# LibraCore

LibraCore is a Library Management System built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This system provides essential features for managing books and user accounts, tailored for both Librarians and Members. The application is designed with JWT-based authentication for secure access.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Database Structure](#database-structure)
- [Hosting](#hosting)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

### As a User

- **Sign Up:** Register as either a Librarian or a Member using a username and password.
- **Login:** Authenticate using username and password to receive a JWT access token.

### As a Librarian

- **Manage Books:** Add, update, and remove books from the library.
- **Manage Members:** Add, update, view, and remove members from the system.
- **View History:** Access the history of all member transactions (issue and return of books).
- **View Member Status:** View both deleted and active members.

### As a Member

- **View Books:** Browse available books in the library.
- **Borrow Books:** Borrow books, changing their status to BORROWED.
- **Return Books:** Return borrowed books, changing their status back to AVAILABLE.
- **Delete Account:** Option to delete their own account.
- **View Borrowing History:** Access the history of borrowed books.

## Technologies Used

- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)

## Installation

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/LibraCore.git
cd LibraCore
```

The database consists of the following collections:

Users: Stores user information including username, password, and role.
Books: Stores book information, including title, author, and status.
History: Logs the borrowing and returning history of books.

Frontend: Hosted on Vercel
Backend: Hosted on your preferred platform (please specify).
