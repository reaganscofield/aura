"use strict";
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define(
    "Users",
    {
      id:               { primaryKey: true, type: DataTypes.UUID },
      username:         { type: DataTypes.STRING, allowNull: false },
      first_name:       { type: DataTypes.STRING, allowNull: false },
      last_name:        { type: DataTypes.STRING, allowNull: false },
      email:            { type: DataTypes.STRING, allowNull: false },
      phone_number:     { type: DataTypes.INTEGER, allowNull: false },
      address_street:   { type: DataTypes.STRING, allowNull: false },
      address_suburb:   { type: DataTypes.STRING, allowNull: false },
      address_city:     { type: DataTypes.STRING, allowNull: false },
      address_region:   { type: DataTypes.STRING, allowNull: false },
      address_country:  { type: DataTypes.STRING, allowNull: false },
      address_zip:      { type: DataTypes.INTEGER, allowNull: false }
    },
  
  );

  Users.beforeCreate((user, _ ) => {
    return user.id = uuid();
  });


  Users.associate = (models) => {
    Users.hasMany(models.Panics, {
      foreignKey: 'user_id',
      as: 'panics',
    });
    Users.hasOne(models.Notifications, {
      foreignKey: 'user_id',
      as: 'notification',
    });
  };


  return Users;

};
