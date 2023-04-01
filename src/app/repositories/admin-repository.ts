import { Admin } from '../entities/admin';

export abstract class AdminRepository {
  abstract create(admin: Admin): Promise<void>;
}
