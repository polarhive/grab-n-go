import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

let loggedInUser = null; // Track the logged-in user
let users = [
  { name: 'Dan', password: 'password' },
  { name: 'Alice', password: 'secret' }
]; // Initial users (this can be replaced with a database)

app.get('/api', (req, res) => {
  console.log("Health check received");
  res.status(200).json({ message: 'Backend is online' });
});

// Signup endpoint to register a new user
app.post('/api/auth/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = users.find(u => u.name === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  // Add new user to the list (replace with database logic in real apps)
  users.push({ name: username, password });
  return res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login endpoint to authenticate a user
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Find user and check if password matches
  const user = users.find(u => u.name === username && u.password === password);

  if (user) {
    loggedInUser = user.name; // Store logged-in user
    return res.json({ success: true, message: 'Login successful' });
  }

  return res.json({ success: false, message: 'Invalid credentials' });
});

// Get logged-in user's information
app.get('/api/auth/user', (req, res) => {
  if (loggedInUser) {
    return res.json({ success: true, username: loggedInUser });
  }
  return res.status(401).json({ success: false, message: 'No user logged in' });
});

// Logout endpoint (clears logged-in user)
app.post('/api/auth/logout', (req, res) => {
  loggedInUser = null;
  return res.json({ success: true, message: 'Logged out successfully' });
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
