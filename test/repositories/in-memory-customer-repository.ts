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
}
