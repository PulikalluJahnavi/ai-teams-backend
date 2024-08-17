const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');

// List all tasks
router.get('/', authMiddleware.authenticateToken, taskController.getAllTasks);

// Create a new task with validation
router.post('/', [
    body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
    body('status').optional().trim().escape(), // status is optional
    body('agent_id').not().isEmpty().isInt().withMessage('Valid agent ID is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    taskController.createTask(req, res);
});

// Get one task by ID
router.get('/:id', authMiddleware.authenticateToken, taskController.getTask);

// Update a task by ID
router.put('/:id', [
    body('description').optional().trim().escape(),
    body('status').optional().trim().escape(),
    body('agent_id').optional().isInt()
], authMiddleware.authenticateToken, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    taskController.updateTask(req, res);
});

// Delete a task by ID
router.delete('/:id', authMiddleware.authenticateToken, taskController.deleteTask);

module.exports = router;