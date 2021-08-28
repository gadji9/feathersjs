import * as authentication from '@feathersjs/authentication';
import { NotFound} from '@feathersjs/errors';
import { HookContext } from '@feathersjs/hooks';
import basehookscript from '../custom/basehookscript';
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
    patch: [async(context:any)=>{
      context.data.model = context.app.get('sequelizeClient').models;
      context.data.array = context.data.footballersids
    }],
    remove: []
  },

  after: {
    all: [],
    find: [async (context:any):Promise<void>=>{
      console.log('team');
      const {team, coach, footballer} = context.app.get('sequelizeClient').models;
      if(context.params.query.id){ //если в запросе есть id
        const curTeam:any = await team.findByPk(context.params.query.id);
        if(!curTeam){ // если не нашлась команда
          console.log('error');
          throw new Error('Not Found');
        }
        const curCoach:any = await curTeam.getCoach();
        const footballers = await curTeam.getFootballers();
        const res = {id:curTeam.id, teamname:curTeam.name,coachname:curCoach.name, coachsurname: curCoach.surname,footballers: footballers};
        context.result = res;
      }
      else{ 
        try {
          const teams = await team.findAll({include: [{model: footballer},{model: coach}]});
          context.result= teams;
        } catch (error) {
          console.log(error);
        }
      }
    }],
    get: [],
    create: [(context: any):void=>{
      try {
        const {team, coach} = context.app.get('sequelizeClient').models; 
        team.create({name: context.data.commandname}).then((curTeam: any)=>{
          coach.create({name: context.data.coachname, surname: context.data.coachsurname}).then((curCoach:any)=>{
            curTeam.setCoach(curCoach);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }],
    update: [],
    patch: [async (context:any):Promise<void>=>{
      basehookscript(context,(ID:number)=>{
        return {teamId: context.id, footballerId: ID, status: 'active'}
      })
    }],
    remove: []
  },

  error: {
    all: [(context:any): any=>{
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
