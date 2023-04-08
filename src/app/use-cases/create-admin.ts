import { hash } from 'bcrypt';
import { Admin } from '../entities/admin';
import { AdminRepository } from '../repositories/admin-repository';
import { Injectable } from '@nestjs/common';

interface CreateAdminResponse {
  admin: Admin;
}

interface CreateAdminRequest {
  email: string;
  name: string;
  phone: string;
  password: string;
}
@Injectable()
export class CreateAdmin {
  constructor(private adminService: AdminRepository) {}

  async execute(request: CreateAdminRequest): Promise<CreateAdminResponse> {
    const { email, name, phone, password } = request;

    const passwordEncrypted = await hash(
      password,
      parseInt(process.env.BCRYPT_SALTS ?? '10'),
    );

    const admin = new Admin({
      email,
      name,
      phone,
      password: passwordEncrypted,
    });

    await this.adminService.create(admin);

    return {
      admin,
    };
  }
}
