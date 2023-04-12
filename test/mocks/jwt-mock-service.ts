import { Admin } from '@app/entities/admin';
import { AdminRepository } from '@app/repositories/admin-repository';
import { CustomerRepository } from '@app/repositories/customer-repository';
import {
  JWTAuthenticationService,
  JWTAuthenticationServiceRequest,
  JWTAuthenticationServiceResponse,
} from '@app/services/jwt-authentication-service';
import { AdminNotFound } from '@app/use-cases/errors/admin-not-found';
import { CustomerNotFound } from '@app/use-cases/errors/customer-not-found';
import { randomUUID } from 'crypto';

type JwtMockServiceRepository = AdminRepository | CustomerRepository;

export class JwtMockService<T extends JwtMockServiceRepository>
  implements JWTAuthenticationService
{
  constructor(private repository: T) {}
  async sign(
    request: JWTAuthenticationServiceRequest,
  ): Promise<JWTAuthenticationServiceResponse> {
    const { email } = request;
    return { token: randomUUID() + '#' + email };
  }
  async decode(
    request: JWTAuthenticationServiceResponse,
  ): Promise<JWTAuthenticationServiceRequest> {
    const { token } = request;

    const email = token.split('#')[1];

    const user = await this.repository.findByEmail(email);

    const isAdminRepository = this.repository instanceof AdminRepository;

    const isAdmin = user instanceof Admin;

    if (isAdminRepository && !user) {
      throw new AdminNotFound();
    }

    if (!isAdminRepository && !user) {
      throw new CustomerNotFound();
    }

    return {
      email: user?.email || '',
      id: user?.id || '',
      isAdmin,
    };
  }
}
