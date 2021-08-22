// Initializes the `team_footballer` service on path `/team_footballer`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TeamFootballer } from './team_footballer.class';
import createModel from '../../models/team_footballer.model';
import hooks from './team_footballer.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'team_footballer': TeamFootballer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/team_footballer', new TeamFootballer(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('team_footballer');

  service.hooks(hooks);
}
