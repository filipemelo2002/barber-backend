import { makeCustomer } from '@test/factories/customer-factory';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { GetCustomer } from './get-customer';
import { CustomerNotFound } from './errors/customer-not-found';

describe('Get Customer', () => {
  it('should get a specific customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const sampleCustomer = makeCustomer();
    customerRepository.customers = [sampleCustomer];
    const getCustomer = new GetCustomer(customerRepository);

    const { customer } = await getCustomer.execute({
      customerId: sampleCustomer.id,
    });

    expect(customer).toBe(sampleCustomer);
  });

  it('should not get a specific customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const getCustomer = new GetCustomer(customerRepository);

    expect(() => {
      return getCustomer.execute({ customerId: 'whatever-non-existing-id' });
    }).rejects.toThrow(CustomerNotFound);
  });
});
