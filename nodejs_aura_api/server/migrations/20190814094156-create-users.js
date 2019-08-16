"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {allowNull: false,primaryKey: true,type: Sequelize.UUID,},
      username: { type: Sequelize.STRING, allowNull: false },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      phone_number: { type: Sequelize.INTEGER, allowNull: false },
      address_street: { type: Sequelize.STRING, allowNull: false },
      address_suburb: { type: Sequelize.STRING, allowNull: false },
      address_city: { type: Sequelize.STRING, allowNull: false },
      address_region: { type: Sequelize.STRING, allowNull: false },
      address_country: { type: Sequelize.STRING, allowNull: false },
      address_zip: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false, type: Sequelize.DATE}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
