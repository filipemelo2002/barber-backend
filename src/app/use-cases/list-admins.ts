import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAdmins {
  constructor(private adminRepository: AdminRepository) {}
  async execute() {
    const admins = await this.adminRepository.findAll();
    return {
      admins,
    };
  }
}
