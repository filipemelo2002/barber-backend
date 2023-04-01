import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findById(id: string): Promise<Customer | undefined> {
    return this.customers.find((customer) => customer.id === id);
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      ({ id }) => id === customer.id,
    );
    this.customers[customerIndex] = customer;
  }
}
