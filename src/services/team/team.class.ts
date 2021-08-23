import { Service, SequelizeServiceOptions} from 'feathers-sequelize';
import { Application } from '../../declarations';
import {Sequelize} from 'sequelize'
import app from '../../app'


export class Team extends Service {
  async find(params:any): Promise<any>{
    console.log('team')
    const {team, coach, footballer} = app.get('sequelizeClient').models
    if(params.query.id){ //если в запросе есть id
      const curTeam:any = await team.findByPk(params.query.id)
      if(!curTeam){ // если не нашлась команда
        console.log('error')
        throw new Error("Not Found")
    }
      const curCoach:any = await curTeam.getCoach()
      const footballers = await curTeam.getFootballers()
      const res = {id:curTeam.id, teamname:curTeam.name,coachname:curCoach.name, coachsurname: curCoach.surname,footballers: footballers}
    return res
    }
    else{ 
      let res:any[] = []
      try {
        const teams = await team.findAll({include: [{model: footballer},{model: coach}]})
        // for (const curTeam of teams) { // собираем все данные через цикл
        //   let curCoach = await curTeam.getCoach()
        //   let footballers
        //   try {
           
        //     footballers = await curTeam.getFootballers()
        //   } catch (error) {
        //     res.unshift({id:curTeam.id, teamname:curTeam.name,coachname:curCoach.name, coachsurname: curCoach.surname,footballers: []})
        //     continue
        //   }
          
        //   res.unshift({id:curTeam.id, teamname:curTeam.name,coachname:curCoach.name, coachsurname: curCoach.surname,footballers: footballers})
        // }
        return teams
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
