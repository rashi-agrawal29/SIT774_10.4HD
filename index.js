// Require the express web application framework (https://expressjs.com)
const express = require('express')
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public_html')); // Serve static files (HTML, CSS, JS)
app.set('view engine', 'ejs'); // For rendering pages dynamically

// Session setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rashi-2909#',
  database: 'ecoflow_db'
})

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Route to display homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public_html/index.html');
});

// User sign up route
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public_html/signup.html');
});

// Handle sign up form submission
app.post('/signup', async(req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password with a salt rounds value of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedemail = await bcrypt.hash(email, 10);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    
    // Perform the database insertion
    db.query(sql, [hashedemail, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error registering user.');
        }
        res.send('User registered successfully!');

        // Log the hashed password to check implementation
        console.log(`User email: ${email}`);
        console.log(`Original password: ${password}`);
        console.log(`Hashed email: ${hashedemail}`);
        console.log(`Hashed password: ${hashedPassword}`);
    });
} catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Error processing request.');
}
});

// User login route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public_html/login.html');
});

// Simplified login form submission without password encryption
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          const user = results[0];
          // Directly compare input password with stored password
          if (password === user.password) {
              req.session.user = user;
              res.sendFile(__dirname + '/public_html/index.html');
          } else {
              res.send('Incorrect password');
          }
      } else {
          res.send('No user found with this email');
      }
  });
});


// User login route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Handle feedback form submission
app.post('/submit-feedback', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Insert feedback details into the database
    const sql = 'INSERT INTO feedback (name, email, phone, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error while saving feedback. Please try again later.');
        }
        res.send('Feedback submitted successfully!');
    });
});

// Tell our application to listen to requests at port 3000 on the localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
