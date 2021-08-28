import * as authentication from '@feathersjs/authentication';
import { NotFound} from '@feathersjs/errors';
import { HookContext } from '@feathersjs/hooks';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default async (context:any,createparams:any):Promise<void>=>{
      try {
        for (const ID of context.data.array) {
            if(context.data.model = context.app.get('sequelizeClient').models.team_footballer){
                const rels = await context.data.model.findAll({where: {footballerId: ID, status: 'active'}});
                if(!rels) break;
                rels.map((rel:any)=>{
                    rel.status = 'kicked';
                    rel.save();
                });
                if(await context.data.model.count({where:{teamId: context.id, footballerId: ID}}) == 0)
                {
                    context.data.model.create(createparams(ID));
                }
                else{
                    console.log(await context.data.model.count({where:{teamId: context.id, footballerId: ID}}));
                    context.data.model.findOne({where:{teamId: context.id, footballerId: ID}}).then((curRel:any)=>{
                    curRel.status = 'active';
                    curRel.save();
                    });
                }
            }
            else{
                if(createparams)
                context.data.model.create(createparams(ID));
            }
        }
      } catch (error) {
        console.log(error);
      }
    }