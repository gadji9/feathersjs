// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';
export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const team = sequelizeClient.define('team', {
    id: {
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
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (team as any).associate = function (models: any): void {
    team.hasOne(models.coach);
    console.log(models.team_footballer);
    team.belongsToMany(models.footballer, {through: models.team_footballer});
    models.footballer.belongsToMany(team, {through: models.team_footballer});
  };
  return team;
}