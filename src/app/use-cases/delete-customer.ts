import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';

interface DeleteCustomerRequest {
  id: string;
}
@Injectable()
export class DeleteCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(request: DeleteCustomerRequest): Promise<void> {
    const { id } = request;
    const userExists = !!(await this.customerRepository.findById(id));

    if (!userExists) {
      throw new CustomerNotFound();
    }

    await this.customerRepository.delete(id);
  }
}
