import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [async (context:any)=>{
      const {team, footballer, team_footballer} = context.app.get('sequelizeClient').models
      context.result = await footballer.findAll({include: team})
    }],
    get: [],
    create: [async (context:any)=>{
      try {
        const {team, footballer, team_footballer} = context.app.get('sequelizeClient').models
        const curFootballer = await footballer.create({name: context.data.name, surname: context.data.surname})
        const curTeam = await team.findByPk(context.data.teamid)
        if(!curTeam) throw new Error('Not Custom Found')
        curTeam.addFootballer(curFootballer,{through:team_footballer })
        } catch (error) {
          console.log(error)
        }
    }],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
