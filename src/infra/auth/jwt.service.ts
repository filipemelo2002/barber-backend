import { Injectable } from '@nestjs/common';
import {
  JWTAuthenticationService,
  JWTAuthenticationServiceRequest,
  JWTAuthenticationServiceResponse,
} from '@app/services/jwt-authentication-service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JWTService implements JWTAuthenticationService {
  constructor(private jwtService: JwtService) {}
  async sign(request: JWTAuthenticationServiceRequest) {
    const { email, id, isAdmin } = request;
    const token = await this.jwtService.signAsync({ email, id, isAdmin });
    return {
      token,
    };
  }

  async decode(
    request: JWTAuthenticationServiceResponse,
  ): Promise<JWTAuthenticationServiceRequest> {
    const { token } = request;
    const payload =
      await this.jwtService.verifyAsync<JWTAuthenticationServiceRequest>(token);
    return payload;
  }
}
