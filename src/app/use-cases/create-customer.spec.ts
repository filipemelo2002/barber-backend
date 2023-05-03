import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { CreateCustomer } from './create-customer';
import { CustomerAlreadyExists } from './errors/customer-already-exists';

describe('create customer use-case', () => {
  it('should create a new customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const service = new CreateCustomer(customerRepository);
    const { customer } = await service.execute({
      email: 'filipe@test.com',
      name: 'filipe',
      phone: '+55819999999',
      password: 'test',
    });

    expect(customerRepository.customers).toHaveLength(1);
    expect(customerRepository.customers[0]).toEqual(customer);
  });

  it('should not create a new customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const service = new CreateCustomer(customerRepository);
    await service.execute({
      email: 'filipe@test.com',
      name: 'filipe',
      phone: '+55819999999',
      password: 'test',
    });
    expect(() => {
      return service.execute({
        email: 'filipe@test.com',
        name: 'filipe',
        phone: '+55819999999',
        password: 'test',
      });
    }).rejects.toThrow(CustomerAlreadyExists);
  });
});
