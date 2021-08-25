'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.createTable('team_footballer', { id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                primaryKey: true,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        queryInterface.dropTable('team_footballer');
    }
};
