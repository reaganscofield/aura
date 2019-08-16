'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SecurityAgents', {
      id: {allowNull: false, primaryKey: true,type: Sequelize.UUID,},
      username: { type: Sequelize.STRING, allowNull: false },
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      phone_number: { type: Sequelize.INTEGER, allowNull: false },
      current_address_street: { type: Sequelize.STRING, allowNull: false },
      current_address_suburb: { type: Sequelize.STRING, allowNull: false },
      current_address_city: { type: Sequelize.STRING, allowNull: false },
      current_address_region: { type: Sequelize.STRING, allowNull: false },
      current_address_country: { type: Sequelize.STRING, allowNull: false },
      current_address_zip: { type: Sequelize.INTEGER, allowNull: false },
      is_on_trip: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false  },
      is_online: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false  },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true  },
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
      company_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
          as: 'company_id',
        },
      },
      vehicule_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Vehicules',
          key: 'id',
          as: 'vehicule_id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SecurityAgents');
  }
};