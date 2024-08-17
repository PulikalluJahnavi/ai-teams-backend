const db = require('../models'); // Ensure the path to your models is correct

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { description, status, agent_id } = req.body;
    const task = await db.Task.create({
      description,
      status,
      agent_id
    });
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await db.Task.findAll({
      include: ['agent']  // Assumes 'agent' association is defined in your Sequelize model
    });
    res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id, {
      include: ['agent']
    });
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (task) {
      const { description, status, agent_id } = req.body;
      await task.update({ description, status, agent_id });
      res.send(task);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const numDeleted = await db.Task.destroy({
      where: { id: req.params.id }
    });
    if (numDeleted) {
      res.send({ message: "Task deleted" });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};