import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCustomerBody,
  UpdateCustomerBody,
} from '../dtos/create-customer-body';
import { CreateCustomer } from '@app/use-cases/create-customer';
import { CustomerViewModel } from '../view-model/customer-view-model';
import { ListCustomers } from '@app/use-cases/list-customers';
import { UpdateCustomer } from '@app/use-cases/update-customer';
import { DeleteCustomer } from '@app/use-cases/delete-customer';
import { GetCustomer } from '@app/use-cases/get-customer';

@Controller('/customers')
export class CustomerController {
  constructor(
    private createCustomer: CreateCustomer,
    private listCustomers: ListCustomers,
    private updateCustomer: UpdateCustomer,
    private deleteCustomer: DeleteCustomer,
    private getCustomer: GetCustomer,
  ) {}

  @Get()
  async list() {
    const { customers } = await this.listCustomers.execute();

    return {
      customers: customers.map(CustomerViewModel.toHTTP),
    };
  }

  @Get(':customerId')
  async show(@Param('customerId') id: string) {
    const { customer } = await this.getCustomer.execute({ customerId: id });

    return { customer: CustomerViewModel.toHTTP(customer) };
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

  @Put(':customerId')
  async update(
    @Body() body: UpdateCustomerBody,
    @Param('customerId') id: string,
  ) {
    const { name, email, phone, password } = body;
    const { customer } = await this.updateCustomer.execute({
      name,
      email,
      phone,
      password,
      id,
    });

    return {
      customer: CustomerViewModel.toHTTP(customer),
    };
  }

  @Delete(':customerId')
  async delete(@Param('customerId') id: string) {
    await this.deleteCustomer.execute({ id });
  }
}
