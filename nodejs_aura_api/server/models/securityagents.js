'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {

  const SecurityAgents = sequelize.define('SecurityAgents', {
      id:                       { primaryKey: true, type: DataTypes.UUID },
      username:                 { type: DataTypes.STRING, allowNull: false },
      first_name:               { type: DataTypes.STRING, allowNull: false },
      last_name:                { type: DataTypes.STRING, allowNull: false },
      email:                    { type: DataTypes.STRING, allowNull: false },
      phone_number:             { type: DataTypes.INTEGER, allowNull: false },
      current_address_street:   { type: DataTypes.STRING, allowNull: false },
      current_address_suburb:   { type: DataTypes.STRING, allowNull: false },
      current_address_city:     { type: DataTypes.STRING, allowNull: false },
      current_address_region:   { type: DataTypes.STRING, allowNull: false },
      current_address_country:  { type: DataTypes.STRING, allowNull: false },
      current_address_zip:      { type: DataTypes.INTEGER, allowNull: false },
      is_on_trip:               { type: DataTypes.BOOLEAN, allowNull: false },
      is_online:                { type: DataTypes.BOOLEAN, allowNull: false },
  });


  SecurityAgents.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });


  SecurityAgents.associate = (models) => {
    SecurityAgents.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE',
    });
    SecurityAgents.belongsTo(models.Vehicule, {
      foreignKey: 'vehicule_id',
      onDelete: 'CASCADE',
    });
    SecurityAgents.hasOne(models.Panics, {
      foreignKey: 'agent_id',
      as: 'agent',
    });
    SecurityAgents.hasOne(models.Notifications, {
      foreignKey: 'agent_id',
      as: 'notification',
    });

  };

  return SecurityAgents;
  
};