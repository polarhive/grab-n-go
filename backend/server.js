import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

dotenv.config(); // Load environment variables

// MongoDB Configuration
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    srn: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// In-memory variable to store logged-in user
let loggedInUser = null;

// Health Check Route
app.get('/api', (req, res) => {
  console.log('[GET] /api - Health check endpoint hit.');
  res.status(200).json({ message: 'Backend is online' });
});

// Authentication Routes
// Signup
app.post('/api/auth/signup', async (req, res) => {
  console.log('[POST] /api/auth/signup - Received request with body:', req.body);
  try {
    const { name, srn, password } = req.body;

    // Check if user already exists
    console.log('Checking if user exists for SRN:', srn);
    const existingUser = await User.findOne({ srn });
    if (existingUser) {
      console.log(`Signup failed: User with SRN ${srn} already exists.`);
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    // Hash the password
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    console.log('Creating new user...');
    const user = new User({
      name,
      srn,
      password: hashedPassword,
    });

    await user.save();
    console.log('New user created successfully:', user);
    res.status(201).json({ 
      success: true,
      message: 'User created successfully' 
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Error creating user', 
      error: error.message 
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  console.log('[POST] /api/auth/login - Received request with body:', req.body);
  try {
    const { srn, password } = req.body;

    // Find the user by SRN
    console.log('Looking for user with SRN:', srn);
    const user = await User.findOne({ srn });
    if (!user) {
      console.log(`Login failed: User with SRN ${srn} not found.`);
      return res.status(400).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Validate the password
    console.log('Validating password...');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Login failed: Invalid password.');
      return res.status(400).json({ 
        success: false,
        message: 'Invalid password' 
      });
    }

    console.log('Login successful for user:', user.name);

    // Store logged-in user information in memory
    loggedInUser = { name: user.name, srn: user.srn };

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        srn: user.srn,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Error logging in', 
      error: error.message 
    });
  }
});

// Password Reset Route
app.post('/api/auth/reset-password', async (req, res) => {
  console.log('[POST] /api/auth/reset-password - Received request with body:', req.body);
  try {
    const { srn, newPassword } = req.body;

    // Find the user by SRN
    console.log('Looking for user with SRN:', srn);
    const user = await User.findOne({ srn });
    if (!user) {
      console.log(`Password reset failed: User with SRN ${srn} not found.`);
      return res.status(400).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Hash the new password
    console.log('Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    console.log('Updating password for user:', user.name);
    user.password = hashedPassword;
    await user.save();

    console.log('Password updated successfully for user:', user.name);
    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Error during password reset:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error resetting password', 
      error: error.message 
    });
  }
});

// Get logged-in user's information
app.get('/api/auth/user', (req, res) => {
  console.log('[GET] /api/auth/user - Fetching logged-in user data.');
  if (loggedInUser) {
    return res.json({
      success: true,
      name: loggedInUser.name,
    });
  }
  return res.status(401).json({ 
    success: false, 
    message: 'No user logged in' 
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  console.log('[POST] /api/auth/logout - Logging out user.');

  // Reset the in-memory logged-in user to null
  loggedInUser = null;

  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error occurred:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});