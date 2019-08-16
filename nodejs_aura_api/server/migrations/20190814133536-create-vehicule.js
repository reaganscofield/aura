'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicules', {
      id: {allowNull: false,primaryKey: true,type: Sequelize.UUID,},
      name: { type: Sequelize.STRING, allowNull: false },
      mark: { type: Sequelize.STRING, allowNull: false },
      lincese_number: { type: Sequelize.STRING, allowNull: false },
      plate_number: { type: Sequelize.STRING, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehicules');
  }
};