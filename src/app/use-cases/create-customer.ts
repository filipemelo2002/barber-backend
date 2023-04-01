import { hash } from 'bcrypt';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';
import { Injectable } from '@nestjs/common';

interface CreateCustomerResponse {
  customer: Customer;
}

interface CreateCustomerRequest {
  email: string;
  name: string;
  phone: string;
  password: string;
}
@Injectable()
export class CreateCustomer {
  constructor(private customerService: CustomerRepository) {}

  async execute(
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    const { email, name, phone, password } = request;

    const passwordEncrypted = await hash(
      password,
      parseInt(process.env.BCRYPT_SALTS ?? '10'),
    );

    const customer = new Customer({
      email,
      name,
      phone,
      password: passwordEncrypted,
    });

    await this.customerService.create(customer);

    return {
      customer,
    };
  }
}
