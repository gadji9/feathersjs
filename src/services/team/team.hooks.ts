import * as authentication from '@feathersjs/authentication';
import { NotFound, GeneralError, BadRequest } from '@feathersjs/errors'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [(context :any)=>{
      context.data.app = context.app
    }],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [(context:any)=>{
      console.log('after: ' + context.result)
    }],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
