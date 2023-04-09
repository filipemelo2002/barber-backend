import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
import { Request } from 'express';
import { MissingValidToken } from './errors/missing-valid-token';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JWTAuthenticationService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new MissingValidToken();
    }

    try {
      const { isAdmin } = await this.jwtService.decode({
        token,
      });
      return isAdmin;
    } catch (exception) {
      throw new MissingValidToken();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
