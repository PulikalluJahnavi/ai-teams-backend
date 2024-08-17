module.exports = (sequelize, DataTypes) => {
    const Agent = sequelize.define('Agent', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      skill: {
        type: DataTypes.STRING
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      }
    }, {
      tableName: 'Agents'
    });
  
    Agent.associate = function(models) {
      Agent.belongsTo(models.Team, {
        foreignKey: 'team_id',
        as: 'team'
      });
      Agent.hasMany(models.Task, {
        foreignKey: 'agent_id',
        as: 'tasks'
      });
    };
  
    return Agent;
  };  