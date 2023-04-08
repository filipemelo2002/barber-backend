import { CustomerRepository } from '@app/repositories/customer-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { PrismaAppointmentRepository } from './prisma/repositories/prisma-appointment-repository';
import { AdminRepository } from '@app/repositories/admin-repository';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';

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
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
  ],
  exports: [CustomerRepository, AppointmentRepository, AdminRepository],
})
export class DatabaseModule {}
