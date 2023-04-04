import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';

interface GetCustomerRequest {
  customerId: string;
}

interface GetCustomerResponse {
  customer: Customer;
}
@Injectable()
export class GetCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(request: GetCustomerRequest): Promise<GetCustomerResponse> {
    const { customerId } = request;
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFound();
    }

    return {
      customer,
    };
  }
}
