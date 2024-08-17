const express = require('express');
const dotenv = require('dotenv');
const teamRoutes = require('./routes/teamRoutes');
const agentRoutes = require('./routes/agentRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middlewares/auth');
const authRoutes = require('./routes/authRoutes');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for initial testing
app.get('/', (req, res) => {
    res.send('Welcome to the AI Teams Backend!');
});

// Secure route example
app.get('/api/secure', authMiddleware.authenticateToken, (req, res) => {
    res.json({ message: 'Secure data access confirmed.' });
});

const cors = require('cors');
app.use(cors()); // This enables CORS for all routes and origins

// Specific API routes
app.use('/api/teams', teamRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});