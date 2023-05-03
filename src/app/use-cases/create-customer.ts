import { hash } from 'bcrypt';
import { Customer } from '../entities/customer';
import { CustomerRepository } from '../repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { CustomerAlreadyExists } from './errors/customer-already-exists';

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

    const userAlreadyExists = !!(await this.customerService.findByEmail(email));

    if (userAlreadyExists) {
      throw new CustomerAlreadyExists();
    }

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
