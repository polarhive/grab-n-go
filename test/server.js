import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Sample user data to send as a response
const user = {
  name: "Dan",
};

// Middleware to handle cross-origin requests (if your frontend and backend are on different ports)
app.use(cors());

// API endpoint to fetch user details
app.get('/user', (req, res) => {
  res.json(user); // Send user data as JSON response
});

// Start the server
app.listen(port, () => {
  console.log("Server running at: localhost:5000");
});
