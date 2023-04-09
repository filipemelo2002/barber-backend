import { Admin } from '@app/entities/admin';
import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prismaService: PrismaService) {}
  async create(admin: Admin) {
    const raw = PrismaAdminMapper.toPrisma(admin);
    await this.prismaService.admin.create({ data: raw });
  }
  async findAll(): Promise<Admin[]> {
    const admins = await this.prismaService.admin.findMany();
    return admins.map(PrismaAdminMapper.toDomain);
  }
  async findById(id: string): Promise<Admin | undefined> {
    const raw = await this.prismaService.admin.findFirst({
      where: {
        id,
      },
    });

    if (!raw) {
      return;
    }

    return PrismaAdminMapper.toDomain(raw);
  }

  async save(admin: Admin): Promise<void> {
    await this.prismaService.admin.update({
      where: {
        id: admin.id,
      },
      data: PrismaAdminMapper.toPrisma(admin),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.admin.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    const raw = await this.prismaService.admin.findFirst({ where: { email } });

    if (!raw) {
      return;
    }

    return PrismaAdminMapper.toDomain(raw);
  }
}
