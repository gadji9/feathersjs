"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const app_1 = __importDefault(require("../src/app"));
const sequelize = app_1.default.get('sequelizeClient');
const models = sequelize.models;
// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
module.exports = Object.assign({
    Sequelize: sequelize_1.default,
    sequelize
}, models);
