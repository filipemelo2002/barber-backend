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

  async delete(id: string): Promise<void> {
    const customer = await this.findById(id);
    if (!customer) return;
    this.customers.splice(this.customers.indexOf(customer), 1);
  }
  async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find((customer) => customer.email === email);
  }
}
