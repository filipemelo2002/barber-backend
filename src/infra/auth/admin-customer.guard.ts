import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MissingValidToken } from './errors/missing-valid-token';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { COOKIE_TOKEN_KEY } from '@constants/cookies';

@Injectable()
export class AdminCustomerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JWTAuthenticationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new MissingValidToken();
    }

    try {
      const { id, isAdmin } = await this.jwtService.decode({
        token,
      });

      const idParam = this.reflector.get<string>('id', context.getHandler());

      if (!idParam) {
        return true;
      }

      return isAdmin || id === idParam;
    } catch (exception) {
      throw new MissingValidToken();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookieToken = request.cookies[COOKIE_TOKEN_KEY];

    if (cookieToken) {
      return cookieToken;
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
