import { Customer } from './customer';

describe('Customer', () => {
  it('should create a valid Customer', () => {
    const customer = new Customer({
      name: 'filipe',
      email: 'filipe@test.com',
      password: 'testpassword',
      phone: '+55819999999999',
    });

    expect(customer).toBeTruthy();
  });
});
