module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
      },
      agent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Agents',
          key: 'id'
        }
      }
    }, {
      tableName: 'Tasks'
    });
  
    Task.associate = function(models) {
      Task.belongsTo(models.Agent, {
        foreignKey: 'agent_id',
        as: 'agent'
      });
    };
  
    return Task;
  };