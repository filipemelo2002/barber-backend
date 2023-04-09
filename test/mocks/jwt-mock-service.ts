import { AdminRepository } from '@app/repositories/admin-repository';
import {
  JWTAuthenticationService,
  JWTAuthenticationServiceRequest,
  JWTAuthenticationServiceResponse,
} from '@app/services/jwt-authentication-service';
import { AdminNotFound } from '@app/use-cases/errors/admin-not-found';
import { randomUUID } from 'crypto';

export class JwtMockService implements JWTAuthenticationService {
  constructor(private adminRepository: AdminRepository) {}
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

    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new AdminNotFound();
    }

    return {
      email: admin?.email,
      id: admin?.id,
      isAdmin: true,
    };
  }
}
