import * as authentication from '@feathersjs/authentication';
import { NotFound} from '@feathersjs/errors';
import { HookContext } from '@feathersjs/hooks';
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
      const {team_footballer} = context.app.get('sequelizeClient').models;
      try {
        for (const ID of context.data.footballersids) {
          const rels = await team_footballer.findAll({where: {footballerId: ID, status: 'active'}});
          if(!rels) break;
          rels.map((rel:any)=>{
            rel.status = 'kicked';
            rel.save();
          });
          if(await team_footballer.count({where:{teamId: context.id, footballerId: ID}}) == 0)
          {
            team_footballer.create({teamId: context.id, footballerId: ID, status: 'active'});
          }
          else{
            console.log(await team_footballer.count({where:{teamId: context.id, footballerId: ID}}));
            team_footballer.findOne({where:{teamId: context.id, footballerId: ID}}).then((curRel:any)=>{
              curRel.status = 'active';
              curRel.save();
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
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
