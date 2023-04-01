import { Admin } from './admin';

describe('Admin', () => {
  it('should create a valid Admin', () => {
    const admin = new Admin({
      name: 'filipe',
      email: 'filipe@test.com',
      password: 'testpassword',
      phone: '+55819999999999',
    });

    expect(admin).toBeTruthy();
  });
});
