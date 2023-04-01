import { Customer } from '../entities/customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
}
