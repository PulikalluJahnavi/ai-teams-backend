const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middlewares/auth');

// List all teams with authentication
router.get('/', authMiddleware.authenticateToken, teamController.getAllTeams);

// Create a new team with validation
router.post('/', [
    body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
    body('description').isLength({ min: 5 }).trim().escape().withMessage('Description must be at least 5 characters long')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    teamController.createTeam(req, res);
});

// Secure route to get all teams with their assigned agents
router.get('/teams-with-agents', authMiddleware.authenticateToken, teamController.getTeamsWithAgents);

// Get one team by ID with authentication
router.get('/:id', authMiddleware.authenticateToken, teamController.getTeam);

// Update a team by ID with authentication
router.put('/:id', [
    body('name').optional().trim().escape(),
    body('description').optional().isLength({ min: 5 }).trim().escape()
], authMiddleware.authenticateToken, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    teamController.updateTeam(req, res);
});

// Delete a team by ID with authentication
router.delete('/:id', authMiddleware.authenticateToken, teamController.deleteTeam);

module.exports = router;