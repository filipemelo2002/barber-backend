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
import { CustomerNotFoundExceptionFilter } from './filters/customer-not-found-exception-filter';
import { LoginController } from './controllers/login.controller';
import { AuthModule } from '@infra/auth/auth.module';
import { AdminIncorrectPasswordExceptionFilter } from './filters/admin-incorrect-password-exception-filter';
import { MissingValidTokenExceptionFilter } from './filters/missing-valid-token-exception-filter';
import { CustomerIncorrectPasswordExceptionFilter } from './filters/customer-incorrect-password-exception-filter';
import { FindAppointments } from '@app/use-cases/find-appointments';
import { CustomerEmailAlreadyExistsExceptionFilter } from './filters/customer-email-already-existis-exception-filter';
import { FindAvailableAppointments } from '@app/use-cases/find-available-appointments';

@Module({
  imports: [DatabaseModule, AuthModule],

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
    FindAppointments,
    FindAvailableAppointments,
    {
      provide: APP_FILTER,
      useClass: AdminNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CustomerNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AdminIncorrectPasswordExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MissingValidTokenExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CustomerIncorrectPasswordExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CustomerEmailAlreadyExistsExceptionFilter,
    },
  ],
  controllers: [
    CustomerController,
    AppointmentController,
    AdminController,
    LoginController,
  ],
})
export class HttpModule {}
