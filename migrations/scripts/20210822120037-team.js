'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.createTable('team', { id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            } });
    },
    down: async (queryInterface, Sequelize) => {
        queryInterface.dropTable('team');
    }
};
