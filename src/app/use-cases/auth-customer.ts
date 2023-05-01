import { CustomerRepository } from '@app/repositories/customer-repository';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';
import { compare } from 'bcrypt';
import { CustomerIncorrectPassword } from './errors/customer-incorrect-password';
import { Customer } from '@app/entities/customer';

interface AuthCustomerRequest {
  email: string;
  password: string;
}

interface AuthCustomerResponse {
  token: string;
  customer: Customer;
}
@Injectable()
export class AuthCustomer {
  constructor(
    private jwtService: JWTAuthenticationService,
    private customerRepository: CustomerRepository,
  ) {}

  async execute(request: AuthCustomerRequest): Promise<AuthCustomerResponse> {
    const { email, password } = request;

    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new CustomerNotFound();
    }

    const isSamePassword = await compare(password, customer.password);

    if (!isSamePassword) {
      throw new CustomerIncorrectPassword();
    }

    const { token } = await this.jwtService.sign({
      email,
      id: customer.id,
      isAdmin: false,
    });

    return {
      token,
      customer,
    };
  }
}
