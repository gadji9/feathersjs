import { Service} from 'feathers-sequelize';

export class Coach extends Service {
  async find():Promise<any[]>{
    const coaches = await super.Model.findAll();
    return coaches;
  }
}
