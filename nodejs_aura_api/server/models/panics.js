'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {

  const Panics = sequelize.define('Panics', {
      id:             { primaryKey: true, type: DataTypes.UUID },
      panics_name:    { type: DataTypes.STRING, allowNull: false },
      panics_number:  { type: DataTypes.STRING, allowNull: true }
  });


  Panics.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });


  Panics.associate = (models) => {
    Panics.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    Panics.belongsTo(models.SecurityAgents, {
      foreignKey: 'agent_id',
      onDelete: 'CASCADE',
    });
    Panics.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE',
    });
    Panics.hasOne(models.Notifications, {
      foreignKey: 'panic_id',
      as: 'notification',
    });
  };


  return Panics;
  
};