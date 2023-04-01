import { makeCustomer } from '@test/factories/customer-factory';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { DeleteCustomer } from './delete-customer';
import { CustomerNotFound } from './errors/customer-not-found';

describe('Delete Customer', () => {
  it('should delete a Customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const customer = makeCustomer();
    customerRepository.customers = [customer];
    const customerService = new DeleteCustomer(customerRepository);

    await customerService.execute({ id: customer.id });

    expect(customerRepository.customers).toHaveLength(0);
  });

  it('should thorw an error when deleting a customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const customerService = new DeleteCustomer(customerRepository);

    expect(() => {
      return customerService.execute({ id: 'whatever-non-existing-id' });
    }).rejects.toThrow(CustomerNotFound);
  });
});
