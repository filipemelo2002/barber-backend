import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { CreateCustomer } from '@app/use-cases/create-customer';
import { CustomerViewModel } from '../view-model/customer-view-model';

@Controller('/customers')
export class CustomerController {
  constructor(private createCustomer: CreateCustomer) {}
  @Post()
  async create(@Body() body: CreateCustomerBody) {
    const { email, name, phone, password } = body;

    const { customer } = await this.createCustomer.execute({
      email,
      name,
      phone,
      password,
    });

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }
}
