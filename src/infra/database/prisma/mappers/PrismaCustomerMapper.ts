import { Customer } from '@app/entities/customer';
import { Customer as RawCustomer } from '@prisma/client';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      password: customer.password,
    };
  }

  static toDomain(raw: RawCustomer) {
    return new Customer(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        password: raw.password,
      },
      raw.id,
    );
  }
}
