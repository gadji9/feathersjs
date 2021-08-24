import * as authentication from '@feathersjs/authentication';
import { NotFound, GeneralError, BadRequest } from '@feathersjs/errors'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [async (context:any)=>{
      console.log('team')
    const {team, coach, footballer} = context.app.get('sequelizeClient').models
    if(context.params.query.id){ //если в запросе есть id
      const curTeam:any = await team.findByPk(context.params.query.id)
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
        context.result= teams
      } catch (error) {
        console.log(error)
      }
    }
    }],
    get: [],
    create: [(context: any)=>{
      try {
        const {team, coach} = context.data.app.get('sequelizeClient').models 
      team.create({name: context.data.commandname}).then((curTeam: any)=>{
        coach.create({name: context.data.coachname, surname: context.data.coachsurname}).then((curCoach:any)=>{
          curTeam.setCoach(curCoach)
        })
      })
      } catch (error) {
        console.log(error)
      }
    }],
    update: [],
    patch: [async (context:any)=>{
      const {team, footballer, team_footballer} = context.app.get('sequelizeClient').models
      const curTeam = await team.findByPk(context.id)
      try {
      context.data.footballersids.forEach((ID:number)=>{
      
        team_footballer.create({teamId: context.id, footballerId: ID})
      })
    } catch (error) {
      console.log(error)
    }
  }],
    remove: []
  },

  error: {
    all: [(context:any)=>{
      if(context.error) {
        throw new NotFound('Not Found');
      }
    }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
