import { Service, SequelizeServiceOptions} from 'feathers-sequelize';
import { Application } from '../../declarations';
import {Sequelize} from 'sequelize'
import app from '../../app'


export class Team extends Service {
  async find(params:any): Promise<any>{
    console.log(params)
  }
  async create(data:any){
    
  }
  async patch(id: number, data:any, params:any){ //id - id команды, а в data будет массив из айдишников футолистов
    
    
    
   }
}
