const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rashi-2909#'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');

    // Step 1: Create the database
    db.query('CREATE DATABASE IF NOT EXISTS ecoflow_db', (err, result) => {
        if (err) throw err;
        console.log('Database created or already exists');

        // Step 2: Use the created database
        db.query('USE ecoflow_db', (err, result) => {
            if (err) throw err;
            console.log('Using ecoflow_db');

            // Step 3: Create the users table
            const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;

            db.query(createUsersTable, (err, result) => {
                if (err) throw err;
                console.log('Users table created or already exists');
            });

            // Step 3: Create the feedback table
            const createFeedbackTable = `
                CREATE TABLE IF NOT EXISTS feedback (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(15),
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`;

            db.query(createFeedbackTable, (err, result) => {
                if (err) throw err;
                console.log('Feedback table created or already exists');
                db.end(); // Close the connection after the script finishes
            });
        });
    });
});
