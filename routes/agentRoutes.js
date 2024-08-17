const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middlewares/auth');

// List all agents
router.get('/', authMiddleware.authenticateToken, agentController.getAllAgents);

// Create a new agent with validation
router.post('/', [
    body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
    body('skill').optional().trim().escape(), // skill is optional
    body('team_id').not().isEmpty().isInt().withMessage('Valid team ID is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    agentController.createAgent(req, res);
});

// Get one agent by ID
router.get('/:id', authMiddleware.authenticateToken, agentController.getAgent);

// Update an agent by ID
router.put('/:id', [
    body('name').optional().trim().escape(),
    body('skill').optional().trim().escape(),
    body('team_id').optional().isInt()
], authMiddleware.authenticateToken, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    agentController.updateAgent(req, res);
});

// Delete an agent by ID
router.delete('/:id', authMiddleware.authenticateToken, agentController.deleteAgent);

module.exports = router;