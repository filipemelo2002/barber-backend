import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';
import { AdminNotFound } from './errors/admin-not-found';
import { compare } from 'bcrypt';
import { AdminIncorrectPassword } from './errors/admin-incorrect-password';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
interface AuthAdminRequest {
  email: string;
  password: string;
}

interface AuthAdminResponse {
  token: string;
}
@Injectable()
export class AuthAdmin {
  constructor(
    private adminRepository: AdminRepository,
    private jwtService: JWTAuthenticationService,
  ) {}

  async execute(request: AuthAdminRequest): Promise<AuthAdminResponse> {
    const { email, password } = request;
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new AdminNotFound();
    }

    const isSamePassword = await compare(password, admin.password);

    if (!isSamePassword) {
      throw new AdminIncorrectPassword();
    }

    const { token } = await this.jwtService.sign({
      email,
      id: admin.id,
      isAdmin: true,
    });
    return {
      token,
    };
  }
}
