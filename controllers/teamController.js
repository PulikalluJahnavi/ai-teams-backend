const db = require('../models'); // Adjust the path as necessary

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const team = await db.Team.create({
      name,
      description
    });
    res.status(201).send(team);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get all teams with potential associated agents
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await db.Team.findAll({
      include: ['agents']  // This assumes the association is set in your Sequelize model
    });
    res.send(teams);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a single team by its ID
exports.getTeam = async (req, res) => {
  try {
    const team = await db.Team.findByPk(req.params.id, {
      include: ['agents']
    });
    if (team) {
      res.send(team);
    } else {
      res.status(404).send({ message: "Team not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a team
exports.updateTeam = async (req, res) => {
  try {
    const team = await db.Team.findByPk(req.params.id);
    if (team) {
      const { name, description } = req.body;
      await team.update({ name, description });
      res.send(team);
    } else {
      res.status(404).send({ message: "Team not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    const numDeleted = await db.Team.destroy({
      where: { id: req.params.id }
    });
    if (numDeleted) {
      res.send({ message: "Team deleted" });
    } else {
      res.status(404).send({ message: "Team not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.getTeamsWithAgents = async (req, res) => {
    try {
      const teams = await db.Team.findAll({
        include: [{
          model: db.Agent,
          as: 'agents'
        }]
      });
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams with agents:", error);
      res.status(500).json({ message: "Error fetching data" });
    }
  };  
  