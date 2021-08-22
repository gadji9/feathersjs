import { application } from '@feathersjs/express';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import app from '../../app'

export class Footballer extends Service {
  async create(data:any, params:any){
    app.service('footballer').Model
    const {team, footballer} = app.get('sequelizeClient').models
    console.log(data)
    const curFootballer = await footballer.create({name: data.name, surname: data.surname, teamId: data.teamid})


 }
}
