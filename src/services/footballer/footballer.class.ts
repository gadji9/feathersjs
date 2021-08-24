import { application } from '@feathersjs/express';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import app from '../../app'

export class Footballer extends Service {
  async create(data:any, params:any){
    try {
    const {team, footballer, team_footballer} = app.get('sequelizeClient').models
    const curFootballer = await footballer.create({name: data.name, surname: data.surname})
    const curTeam = await team.findByPk(data.teamid)
    if(!curTeam) throw new Error('Not Custom Found')
    curTeam.addFootballer(curFootballer,{through:team_footballer })
    } catch (error) {
      console.log(error)
    }
 }
 async get(params:any){
  const {team, footballer, team_footballer} = app.get('sequelizeClient').models
   return await team.findAll()
 }
}
