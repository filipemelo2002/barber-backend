import { Admin } from '../entities/admin';

export abstract class AdminRepository {
  abstract create(admin: Admin): Promise<void>;
  abstract findAll(): Promise<Admin[]>;
  abstract save(admin: Admin): Promise<void>;
  abstract findById(id: string): Promise<Admin | undefined>;
  abstract delete(id: string): Promise<void>;
  abstract findByEmail(email: string): Promise<Admin | undefined>;
}
