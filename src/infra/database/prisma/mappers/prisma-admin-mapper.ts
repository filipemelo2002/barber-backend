import { Admin } from '@app/entities/admin';
import { Admin as RawAdmin } from '@prisma/client';

export class PrismaAdminMapper {
  static toPrisma(admin: Admin) {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      password: admin.password,
    };
  }

  static toDomain(raw: RawAdmin) {
    return new Admin(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        password: raw.password,
      },
      raw.id,
    );
  }
}
