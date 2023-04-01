import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { CreateCustomer } from '@app/use-cases/create-customer';
import { CustomerViewModel } from '../view-model/customer-view-model';
import { ListCustomers } from '@app/use-cases/list-customers';

@Controller('/customers')
export class CustomerController {
  constructor(
    private createCustomer: CreateCustomer,
    private listCustomers: ListCustomers,
  ) {}

  @Get()
  async list() {
    const { customers } = await this.listCustomers.execute();

    return {
      customers: customers.map(CustomerViewModel.toHTTP),
    };
  }

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
