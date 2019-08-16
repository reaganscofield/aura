'use strict';
const uuid = require('uuid/v4');


module.exports = (sequelize, DataTypes) => {
  
  const Vehicule = sequelize.define('Vehicule', {
    id:             { primaryKey: true, type: DataTypes.UUID },
    name:           { type: DataTypes.STRING, allowNull: false },
    mark:           { type: DataTypes.STRING, allowNull: false },
    lincese_number: { type: DataTypes.STRING, allowNull: false },
    plate_number:   { type: DataTypes.STRING, allowNull: false },
  });


  Vehicule.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });


  Vehicule.associate = (models) => {
    Vehicule.belongsTo(models.Companies, {
      foreignKey: 'company_id',
      onDelete: 'CASCADE',
    });
    Vehicule.hasOne(models.SecurityAgents, {
      foreignKey: 'vehicule_id',
      as: 'vehicules',
    });
  };

  return Vehicule;

};