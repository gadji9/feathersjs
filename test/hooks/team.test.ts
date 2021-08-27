const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processMessage = require('../../src/services/team/team.hooks')

describe('\'process-message\' hook', () => {
  let app;

  beforeEach(() => {
    // Create a new plain Feathers application
    app = feathers();

    // Register a dummy custom service that just return the
    // message data back
    app.use('/teamtest', {
      async create(data:any) {
        return data;
      }
    });

    // Register the `processMessage` hook on that service
    app.service('teamtest').hooks({
      after: {
        create: processMessage.default.after.create
      }
    });
  });

  it('processes the message as expected', async () => {
    // A user stub with just an 

    // Create a new message with params that contains our user
    const teamtest = await app.service('teamtest').create({
      commandname: 'TestName',
      coachsurname: 'TestCoachSurname',
      coachname: 'TestCoachName'
    });
    assert.ok(teamtest);
    assert.equal(teamtest.commandname, 'TestName');
    // `userId` was set
    assert.equal(teamtest.coachsurname, 'TestCoachSurname');
    assert.equal(teamtest.coachname, 'TestCoachName');
    // `additional` property has been removed
  });
});