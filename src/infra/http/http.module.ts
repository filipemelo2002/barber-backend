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

@Module({
  imports: [DatabaseModule],

  providers: [
    CreateCustomer,
    ListCustomers,
    UpdateCustomer,
    DeleteCustomer,
    GetCustomer,
    CreateAppointment,
  ],
  controllers: [CustomerController, AppointmentController],
})
export class HttpModule {}
