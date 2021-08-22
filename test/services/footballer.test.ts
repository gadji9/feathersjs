import app from '../../src/app';

describe('\'footballer\' service', () => {
  it('registered the service', () => {
    const service = app.service('footballer');
    expect(service).toBeTruthy();
  });
});
