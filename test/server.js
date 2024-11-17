import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Port is configurable through environment variable

// Sample user data to send as a response
const user = {
  name: "Dan",
};

// Middleware to handle cross-origin requests (if your frontend and backend are on different ports)
app.use(cors());

app.get('/api/health', (req, res) => {
  console.log("Health check received");
  res.status(200).json({ message: 'Backend is online' });
});

// API endpoint to fetch user details
app.get('/api/auth/user', (req, res) => {
  res.json(user); // Send user data as JSON response after login is established
});

app.get('/api/auth/login', (req, res) => {
  console.log("Logged in");
  res.status(200).json({ message: 'Logged in' });
});

app.get('/api/auth/logout', (req, res) => {
  console.log("Logged out");
  res.status(200).json({ message: 'Logged out' });
});

// Start the server
app.listen(port, () => {
  console.log("Server running at: localhost:5000");
});
