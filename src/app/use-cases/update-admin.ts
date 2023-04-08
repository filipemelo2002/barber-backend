import { Admin, AdminProps } from '@app/entities/admin';
import { Optional } from '@app/helpers/optional';
import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';
import { AdminNotFound } from './errors/admin-not-found';
import { hash } from 'bcrypt';

interface UpdateAdminRequest
  extends Optional<AdminProps, 'email' | 'name' | 'password' | 'phone'> {
  id: string;
}

interface UpdateAdminResponse {
  admin: Admin;
}
@Injectable()
export class UpdateAdmin {
  constructor(private adminRepository: AdminRepository) {}
  async execute(request: UpdateAdminRequest): Promise<UpdateAdminResponse> {
    const { id, name, email, password, phone } = request;

    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      throw new AdminNotFound();
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.password = password
      ? await hash(password, parseInt(process.env.BRYPT_SALTS || '10'))
      : admin.password;
    admin.phone = phone || admin.phone;

    await this.adminRepository.save(admin);

    return {
      admin,
    };
  }
}
