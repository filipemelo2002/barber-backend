import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MissingValidToken } from './errors/missing-valid-token';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

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

      return isAdmin || id === idParam;
    } catch (exception) {
      throw new MissingValidToken();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
