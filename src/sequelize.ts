import { Sequelize } from 'sequelize';
import { Application } from './declarations';

export default function (app: Application): void {
  const sequelize = new Sequelize('test', 'postgres', 'gm357753', {
    dialect: 'postgres',
    port: 5432,
    host: 'localhost',
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args): Application {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

    return result;
  };
}
