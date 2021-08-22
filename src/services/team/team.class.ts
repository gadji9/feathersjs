import { Service, SequelizeServiceOptions} from 'feathers-sequelize';
import { Application } from '../../declarations';
import {Sequelize} from 'sequelize'
import app from '../../app'


export class Team extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params:any): Promise<any>{
    const {team} = app.get('sequelizeClient').models
    if(params.query.id){
      const curTeam:any = await team.findByPk(params.query.id)
      if(!curTeam){
        console.log('error')
        throw new Error("Not Found")
    }
      const curCoach:any = await curTeam.getCoach()
      const footballers = await curTeam.getFootballers()
      const res = {teamname:curTeam.name,coachname:curCoach.name, coachsurname: curCoach.surname,footballers: footballers}
    return res
    }
    else{
      let res:any[] = []
      try {
        const teams = await team.findAll()
        for (const curTeam of teams) {
          console.log('footballers')
          const curCoach = await curTeam.getCoach()
          console.log('footballers')

          const footballers = await curTeam.getFootballers()
          res.unshift({teamname:curTeam.name,coachname:curCoach.name, coachsurname: curCoach.surname,footballers: footballers})
        }
        console.log('done')
        return res
      } catch (error) {
        console.log(error)
      }
     
    }
    
  }
  async create(data:any){
    try {
      const {team, coach} = data.app.get('sequelizeClient').models 
    team.create({name: data.commandname}).then((curTeam: any)=>{
      coach.create({name: data.coachname, surname: data.coachsurname}).then((curCoach:any)=>{
        curTeam.setCoach(curCoach)
      })
    })
    } catch (error) {
      console.log(error)
    }
    
  }
}
