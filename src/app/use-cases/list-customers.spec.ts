import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { ListCustomers } from './list-customers';
import { makeCustomer } from '@test/factories/customer-factory';

describe('List Customers', () => {
  it('should list all users', async () => {
    const repository = new InMemoryCustomerRepository();
    repository.customers = [makeCustomer(), makeCustomer()];

    const listCustomersService = new ListCustomers(repository);

    const { customers } = await listCustomersService.execute();

    expect(customers).toHaveLength(2);
    expect(customers).toEqual(repository.customers);
  });
});
