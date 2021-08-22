import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

export class TeamFootballer extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params:any):Promise<any>{
    return 'res'
  }
}
