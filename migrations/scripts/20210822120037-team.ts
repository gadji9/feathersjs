'use strict';
import { DataTypes, QueryInterface, QueryInterfaceDropAllTablesOptions } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    queryInterface.createTable('team', { id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }})
  },

  down: async (queryInterface:QueryInterface, Sequelize: any) => {
    queryInterface.dropTable('team')
  }
};
