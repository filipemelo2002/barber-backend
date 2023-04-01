import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { UpdateCustomer } from './update-customer';
import { makeCustomer } from '@test/factories/customer-factory';
import { CustomerNotFound } from './errors/customer-not-found';

describe('Update Customer', () => {
  it("should update the customer's insformation", async () => {
    const customerRespository = new InMemoryCustomerRepository();
    const customer = makeCustomer();
    customerRespository.customers = [customer];
    const updateCustomerService = new UpdateCustomer(customerRespository);

    await updateCustomerService.execute({
      id: customer.id,
      name: 'filipe melo',
    });

    expect(customerRespository.customers[0].name).toEqual('filipe melo');
  });

  it("should not update a customer's information", () => {
    const customerRepository = new InMemoryCustomerRepository();
    const updateCustomerService = new UpdateCustomer(customerRepository);

    expect(() => {
      return updateCustomerService.execute({ id: 'whatever-non-existing-id' });
    }).rejects.toThrow(CustomerNotFound);
  });
});
