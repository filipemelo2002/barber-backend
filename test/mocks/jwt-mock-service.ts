import {
  JWTAuthenticationService,
  JWTAuthenticationServiceRequest,
  JWTAuthenticationServiceResponse,
} from '@app/services/jwt-authentication-service';
import { randomUUID } from 'crypto';

export class JwtMockService implements JWTAuthenticationService {
  async sign(
    request: JWTAuthenticationServiceRequest,
  ): Promise<JWTAuthenticationServiceResponse> {
    const { email } = request;
    return { token: randomUUID() + email };
  }
}
