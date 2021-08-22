// Initializes the `footballer` service on path `/footballer`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Footballer } from './footballer.class';
import createModel from '../../models/footballer.model';
import hooks from './footballer.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'footballer': Footballer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/footballer', new Footballer(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('footballer');

  service.hooks(hooks);
}
