import { Admin } from '@app/entities/admin';
import { AdminRepository } from '@app/repositories/admin-repository';

export class InMemoryAdminRepository implements AdminRepository {
  public admins: Admin[] = [];

  async create(admin: Admin): Promise<void> {
    this.admins.push(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.admins;
  }

  async findById(id: string): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.id === id);
  }

  async save(admin: Admin): Promise<void> {
    const adminIndex = this.admins.findIndex(({ id }) => id === admin.id);
    this.admins[adminIndex] = admin;
  }

  async delete(id: string): Promise<void> {
    const admin = await this.findById(id);
    if (!admin) return;
    this.admins.splice(this.admins.indexOf(admin), 1);
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    return this.admins.find((admin) => admin.email === email);
  }
}
