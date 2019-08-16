'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {

  const Companies = sequelize.define('Companies', {
    id:             { primaryKey: true, type: DataTypes.UUID },
    name:           { type: DataTypes.STRING, allowNull: false },
    email:          { type: DataTypes.STRING, allowNull: false },
    phone_number:   { type: DataTypes.INTEGER, allowNull: false },
    address:        { type: DataTypes.STRING, allowNull: false },
    vat_number:     { type: DataTypes.INTEGER, allowNull: false },
  });


  Companies.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });


  Companies.associate = (models) => {
    Companies.hasMany(models.Vehicule, {
      foreignKey: 'company_id',
      as: 'vehicules',
    });
    Companies.hasMany(models.SecurityAgents, {
      foreignKey: 'company_id',
      as: 'security_agent',
    });
    Companies.hasOne(models.Panics, {
      foreignKey: 'company_id',
      as: 'panics',
    });
    Companies.hasOne(models.Notifications, {
      foreignKey: 'company_id',
      as: 'notification',
    });
  };

  return Companies;
  
};