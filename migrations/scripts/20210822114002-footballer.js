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
        queryInterface.createTable('footballer', { id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            surname: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        queryInterface.dropTable('footballer');
    }
};
