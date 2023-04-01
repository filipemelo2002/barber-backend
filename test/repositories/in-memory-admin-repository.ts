import { Admin } from '@app/entities/admin';
import { AdminRepository } from '@app/repositories/admin-repository';

export class InMemoryAdminRepository implements AdminRepository {
  public admins: Admin[] = [];

  async create(admin: Admin): Promise<void> {
    this.admins.push(admin);
  }
}
