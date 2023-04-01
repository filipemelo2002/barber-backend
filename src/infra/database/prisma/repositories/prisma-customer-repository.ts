import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { PrismaCustomerMapper } from '../mappers/PrismaCustomerMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) {}
  async create(customer: Customer) {
    const raw = PrismaCustomerMapper.toPrisma(customer);
    await this.prismaService.customer.create({ data: raw });
  }
}
