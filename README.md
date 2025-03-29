# Express-User-CRUD-Application

#User Management System

This project is a User Management System built using Node.js, Express, and MySQL. It allows for basic CRUD operations (Create, Read, Update, Delete) to manage user data stored in a MySQL database. The system also includes user authentication by verifying passwords before making changes to sensitive user data.


#Features:
-> Create Users: Add new users with a unique ID, username, email, and password.
-> View Users: Display a list of all users stored in the database.
-> Edit User: Modify the details of an existing user (e.g., change username).
-> Delete User: Remove a user from the database after verifying their password.
-> UUID Integration: Uses the uuid package to generate unique user IDs.
-> Faker.js Integration: Generates fake user data for testing and development purposes.


#Technologies Used:
-> Node.js: JavaScript runtime for server-side programming.
-> Express.js: Web framework used to handle routing and HTTP requests.
-> MySQL: Relational database to store and retrieve user data.
-> EJS: Templating engine to render dynamic HTML views.
-> Faker.js: Library for generating fake data for testing purposes.
-> Method-Override: Middleware to support PUT and DELETE HTTP methods in forms.



#Setup Instructions:


#Clone the repository:
git clone https://github.com/your-username/user-management-system.git

#Install dependencies:
cd user-management-system
npm install


#Set up MySQL database:
Create a table to store user data. You can execute the following SQL query:
CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

#Run the server:
npm start

#Access the application:
Visit http://localhost:3000 in your web browser to start using the app.

#Folder Structure:
/user-management-system
├── /views            # EJS views for rendering HTML
├── /node_modules     # Project dependencies
├── index.js          # Main server file
├── package.json      # Project metadata and dependencies
├── package-lock.json # Locked versions of dependencies
└── README.md         # Project documentation (this file)
