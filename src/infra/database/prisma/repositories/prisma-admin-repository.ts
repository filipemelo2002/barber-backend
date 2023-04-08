import { AdminRepository } from '@app/repositories/admin-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Admin } from '@app/entities/admin';
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prismaService: PrismaService) {}

  async create(admin: Admin): Promise<void> {
    const raw = PrismaAdminMapper.toPrisma(admin);
    await this.prismaService.admin.create({ data: raw });
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.prismaService.admin.findMany();
    return admins.map(PrismaAdminMapper.toDomain);
  }
}
