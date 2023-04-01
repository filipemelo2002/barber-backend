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
  async findAll(): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany();
    return customers.map(PrismaCustomerMapper.toDomain);
  }
  async findById(id: string): Promise<Customer | undefined> {
    const raw = await this.prismaService.customer.findFirst({
      where: {
        id,
      },
    });

    if (!raw) {
      return;
    }

    return PrismaCustomerMapper.toDomain(raw);
  }

  async save(customer: Customer): Promise<void> {
    await this.prismaService.customer.update({
      where: {
        id: customer.id,
      },
      data: PrismaCustomerMapper.toPrisma(customer),
    });
  }
}
