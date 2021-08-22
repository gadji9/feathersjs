import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

export class Coach extends Service {
  async find(params: any){
      const coaches = await super.Model.findAll()
      return coaches
  }
}
