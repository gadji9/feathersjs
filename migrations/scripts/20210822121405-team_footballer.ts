'use strict';
import { DataTypes, QueryInterface, QueryInterfaceDropAllTablesOptions } from 'sequelize';
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      queryInterface.createTable('team_footballer',{ id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
      }
    })
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
  queryInterface.dropTable('team_footballer')
  }
}
