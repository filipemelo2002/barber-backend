import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';
import { AdminNotFound } from './errors/admin-not-found';

interface DeleteAdminRequest {
  id: string;
}
@Injectable()
export class DeleteAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute(request: DeleteAdminRequest): Promise<void> {
    const { id } = request;
    const userExists = !!(await this.adminRepository.findById(id));

    if (!userExists) {
      throw new AdminNotFound();
    }

    await this.adminRepository.delete(id);
  }
}
