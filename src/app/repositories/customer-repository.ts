import { Customer } from '../entities/customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract findAll(): Promise<Customer[]>;
  abstract save(customer: Customer): Promise<void>;
  abstract findById(id: string): Promise<Customer | undefined>;
  abstract delete(id: string): Promise<void>;
  abstract findByEmail(email: string): Promise<Customer | undefined>;
}
