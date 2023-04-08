import { CreateCustomer } from '@app/use-cases/create-customer';
import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { ListCustomers } from '@app/use-cases/list-customers';
import { UpdateCustomer } from '@app/use-cases/update-customer';
import { DeleteCustomer } from '@app/use-cases/delete-customer';
import { GetCustomer } from '@app/use-cases/get-customer';
import { CreateAppointment } from '@app/use-cases/create-appointment';
import { AppointmentController } from './controllers/appointment.controller';
import { CreateAdmin } from '@app/use-cases/create-admin';
import { ListAdmins } from '@app/use-cases/list-admins';
import { AdminController } from './controllers/admin.controller';
import { UpdateAdmin } from '@app/use-cases/update-admin';
import { DeleteAdmin } from '@app/use-cases/delete-admin';
import { GetAdmin } from '@app/use-cases/get-admin';
import { APP_FILTER } from '@nestjs/core';
import { AdminNotFoundExceptionFilter } from './filters/admin-not-found-exception-filter';

@Module({
  imports: [DatabaseModule],

  providers: [
    CreateCustomer,
    ListCustomers,
    UpdateCustomer,
    DeleteCustomer,
    GetCustomer,
    CreateAppointment,
    CreateAdmin,
    ListAdmins,
    UpdateAdmin,
    DeleteAdmin,
    GetAdmin,
    {
      provide: APP_FILTER,
      useClass: AdminNotFoundExceptionFilter,
    },
  ],
  controllers: [CustomerController, AppointmentController, AdminController],
})
export class HttpModule {}
