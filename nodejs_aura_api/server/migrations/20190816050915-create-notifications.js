'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: { allowNull: false,primaryKey: true,type: Sequelize.UUID},
      is_active: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
      to_address: { type: Sequelize.STRING, allowNull: false },
      from_address: { type: Sequelize.STRING, allowNull: false },
      is_arrived: { type: Sequelize.BOOLEAN, allowNull: false },
      is_on_way: { type: Sequelize.BOOLEAN, allowNull: false },
      start_time: { type: Sequelize.DATE},
      ended_time: { type: Sequelize.DATE},
      createdAt: {allowNull: false, type: Sequelize.DATE},
      updatedAt: {allowNull: false, type: Sequelize.DATE},
      user_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
        },
      },
      panic_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Panics',
          key: 'id',
          as: 'panic_id',
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
    return queryInterface.dropTable('Notifications');
  }
};