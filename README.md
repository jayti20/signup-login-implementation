# Express User Authentication System

A simple Express-based backend application that provides user authentication functionality. This system uses MongoDB as its data store and bcryptjs for password hashing and validation. It is structured to give you a basic understanding of how to set up routes for user registration and login while ensuring data security.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (You can download it from [here](https://nodejs.org/))
- A MongoDB cluster (You can set one up on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or install it locally)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-github-username/express-user-authentication.git
    ```

2. Navigate to the project directory:
    ```bash
    cd express-user-authentication
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of your project directory and add your MongoDB connection string:
    ```env
    MONGO_DB_URL=your_mongodb_connection_string_here
    ```

5. Start the server:
    ```bash
    npm start
    ```

## Usage

**Endpoints:**

- **Sign Up**: `POST /api/signup`
    - Body: `{ "emailId": "user@email.com", "password": "securepassword" }`

- **Login**: `POST /api/login`
    - Body: `{ "emailId": "user@email.com", "password": "securepassword" }`

## Built With

- [Express](https://expressjs.com/) - The web framework used.
- [MongoDB](https://www.mongodb.com/) - Database.
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) - Password hashing library.

## Contributing

If you have suggestions for improving this project, please open an issue or a pull request.
