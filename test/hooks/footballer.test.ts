const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const footballerhook = require('../../src/services/footballer/footballer.hooks');


describe('\'footballer\' hook', () => {
  let app;

  beforeEach(() => {
    // Create a new plain Feathers application
    app = feathers();

    // Register a dummy custom service that just return the
    // message data back
    app.use('/footballerhook', {
      async create(data:any) {
        return data;
      }
    });

    // Register the `processMessage` hook on that service
    app.service('footballerhook').hooks({
      after: {
        create: footballerhook.default.after.create
      }
    });
  });

  it('processes the message as expected', async () => {
    // A user stub with just an 

    // Create a new message with params that contains our user
    const footballertest = await app.service('footballerhook').create({
      name: 'TestName',
      surname: 'TestCoachSurname',
      teamid: 12
    });
    assert.ok(footballertest);
    assert.equal(footballertest.name, 'TestName');
    // `userId` was set
    assert.equal(footballertest.secondname, 'TestCoachSurname');
    
    // `additional` property has been removed
  });
});
export{};