import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { CreateCustomer } from './create-customer';
import { makeCustomer } from '@test/factories/customer-factory';
import { AuthCustomer } from './auth-customer';
import { JwtMockService } from '@test/mocks/jwt-mock-service';
import { CustomerIncorrectPassword } from './errors/customer-incorrect-password';

describe('Auth Customer', () => {
  it('should authenticate customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const createCustomer = new CreateCustomer(customerRepository);
    const customerObj = makeCustomer();

    const { customer: myCustomer } = await createCustomer.execute(customerObj);
    const jwtService = new JwtMockService(customerRepository);
    const authCustomer = new AuthCustomer(jwtService, customerRepository);

    const { token, customer } = await authCustomer.execute({
      email: customerObj.email,
      password: 'test',
    });

    expect(token).toBeTruthy();
    expect(customer).toEqual(myCustomer);
  });

  it('should not authenticate customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const createCustomer = new CreateCustomer(customerRepository);
    const customer = makeCustomer();

    await createCustomer.execute(customer);
    const jwtService = new JwtMockService(customerRepository);
    const authCustomer = new AuthCustomer(jwtService, customerRepository);

    expect(() => {
      return authCustomer.execute({
        email: customer.email,
        password: 'whatever-wrong-password',
      });
    }).rejects.toThrow(CustomerIncorrectPassword);
  });
});
