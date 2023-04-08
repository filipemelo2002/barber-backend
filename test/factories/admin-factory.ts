import { AdminProps, Admin } from '@app/entities/admin';
type Override = Partial<AdminProps>;

export function makeAdmin(props: Override = {}) {
  return new Admin({
    email: 'filipe@test.com',
    name: 'filipe',
    phone: '+55819999999',
    password: 'test',
    ...props,
  });
}
