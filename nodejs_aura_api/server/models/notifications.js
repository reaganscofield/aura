'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {

  const Notifications = sequelize.define('Notifications', {
    id:           { primaryKey: true, type: DataTypes.UUID },
    to_address:   { type: DataTypes.STRING, allowNull: false },
    from_address: { type: DataTypes.STRING, allowNull: false },
    is_arrived:   { type: DataTypes.BOOLEAN, allowNull: false },
    is_on_way:    { type: DataTypes.BOOLEAN, allowNull: false },
    start_time:   { type: DataTypes.DATE},
    ended_time:   { type: DataTypes.DATE},
  });


  Notifications.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });


  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Panics, {
      foreignKey: 'panic_id',
      onDelete: 'CASCADE',
    });
    Notifications.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE',
    });
    Notifications.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    Notifications.belongsTo(models.SecurityAgents, {
      foreignKey: 'agent_id',
      onDelete: 'CASCADE',
    });
  };


  return Notifications;
  
};