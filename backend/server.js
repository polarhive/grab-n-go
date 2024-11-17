require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db.config');

// Verify environment variables are loaded
console.log('Environment Check:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT || 5000);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Import Routes
const authRoutes = require('./auth.routes');

// Route Middlewares
app.use('/api/users', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});