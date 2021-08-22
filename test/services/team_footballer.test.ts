import app from '../../src/app';

describe('\'team_footballer\' service', () => {
  it('registered the service', () => {
    const service = app.service('team_footballer');
    expect(service).toBeTruthy();
  });
});
