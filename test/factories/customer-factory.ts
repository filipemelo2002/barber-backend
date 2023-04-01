import { Customer, CustomerProps } from '@app/entities/customer';

type Override = Partial<CustomerProps>;

export function makeCustomer(props: Override = {}) {
  return new Customer({
    email: 'filipe@test.com',
    name: 'filipe',
    phone: '+55819999999',
    password: 'test',
    ...props,
  });
}
