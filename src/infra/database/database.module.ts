import { CustomerRepository } from '@app/repositories/customer-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { PrismaAppointmentRepository } from './prisma/repositories/prisma-appointment-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [CustomerRepository, AppointmentRepository],
})
export class DatabaseModule {}
