import { Customer, CustomerProps } from '@app/entities/customer';
import { Optional } from '@app/helpers/optional';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';
import { hash } from 'bcrypt';

interface UpdateCustomerRequest
  extends Optional<CustomerProps, 'email' | 'name' | 'password' | 'phone'> {
  id: string;
}

interface UpdateCustomerResponse {
  customer: Customer;
}
@Injectable()
export class UpdateCustomer {
  constructor(private customerRepository: CustomerRepository) {}
  async execute(
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> {
    const { id, name, email, password, phone } = request;

    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new CustomerNotFound();
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.password = password
      ? await hash(password, parseInt(process.env.BRYPT_SALTS || '10'))
      : customer.password;
    customer.phone = phone || customer.phone;

    await this.customerRepository.save(customer);

    return {
      customer,
    };
  }
}
