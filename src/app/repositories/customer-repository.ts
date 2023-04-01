import { Customer } from '../entities/customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract findAll(): Promise<Customer[]>;
  abstract save(customer: Customer): Promise<void>;
  abstract findById(id: string): Promise<Customer | undefined>;
}
