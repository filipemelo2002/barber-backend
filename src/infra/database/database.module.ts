import { CustomerRepository } from '@app/repositories/customer-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [CustomerRepository],
})
export class DatabaseModule {}
