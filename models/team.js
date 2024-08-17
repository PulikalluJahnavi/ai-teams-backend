module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'Teams'
    });
  
    Team.associate = function(models) {
      Team.hasMany(models.Agent, {
        foreignKey: 'team_id',
        as: 'agents'
      });
    };
  
    return Team;
  };  