const db = require('../models'); // Ensure the path to your models is correct

// Create a new agent
exports.createAgent = async (req, res) => {
  try {
    const { name, skill, team_id } = req.body;
    const agent = await db.Agent.create({
      name,
      skill,
      team_id
    });
    res.status(201).send(agent);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await db.Agent.findAll({
      include: ['team', 'tasks']  // Assumes 'team' and 'tasks' associations are defined in your Sequelize model
    });
    res.send(agents);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a single agent by ID
exports.getAgent = async (req, res) => {
  try {
    const agent = await db.Agent.findByPk(req.params.id, {
      include: ['team', 'tasks']
    });
    if (agent) {
      res.send(agent);
    } else {
      res.status(404).send({ message: "Agent not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update an agent
exports.updateAgent = async (req, res) => {
  try {
    const agent = await db.Agent.findByPk(req.params.id);
    if (agent) {
      const { name, skill, team_id } = req.body;
      await agent.update({ name, skill, team_id });
      res.send(agent);
    } else {
      res.status(404).send({ message: "Agent not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete an agent
exports.deleteAgent = async (req, res) => {
  try {
    const numDeleted = await db.Agent.destroy({
      where: { id: req.params.id }
    });
    if (numDeleted) {
      res.send({ message: "Agent deleted" });
    } else {
      res.status(404).send({ message: "Agent not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};