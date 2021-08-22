// Initializes the `coach` service on path `/coach`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Coach } from './coach.class';
import createModel from '../../models/coach.model';
import hooks from './coach.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'coach': Coach & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/coach', new Coach(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('coach');

  service.hooks(hooks);
}
