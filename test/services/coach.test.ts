import app from '../../src/app';

describe('\'coach\' service', () => {
  it('registered the service', () => {
    const service = app.service('coach');
    expect(service).toBeTruthy();
  });
});
