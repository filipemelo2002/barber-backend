import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';

interface ListCustomersResponse {
  customers: Customer[];
}
@Injectable()
export class ListCustomers {
  constructor(private customerService: CustomerRepository) {}
  async execute(): Promise<ListCustomersResponse> {
    const customers = await this.customerService.findAll();
    return {
      customers,
    };
  }
}
