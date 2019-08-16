'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Panics', {
      id: { allowNull: false,primaryKey: true,type: Sequelize.UUID},
      panics_name: { type: Sequelize.STRING, allowNull: false },
      panics_number: { type: Sequelize.STRING, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
        },
      },
      company_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
          as: 'company_id',
        },
      },
      agent_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'SecurityAgents',
          key: 'id',
          as: 'agent_id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Panics');
  }
};