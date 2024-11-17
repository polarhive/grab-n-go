const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./User');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, srn, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ srn });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      srn,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { srn, password } = req.body;

    // Find the user by SRN
    const user = await User.findOne({ srn });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        srn: user.srn
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;