import { Admin } from '@app/entities/admin';
import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';
import { AdminNotFound } from './errors/admin-not-found';

interface GetAdminRequest {
  adminId: string;
}

interface GetAdminResponse {
  admin: Admin;
}
@Injectable()
export class GetAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute(request: GetAdminRequest): Promise<GetAdminResponse> {
    const { adminId } = request;
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new AdminNotFound();
    }

    return {
      admin,
    };
  }
}
