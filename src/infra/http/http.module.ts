import { CreateCustomer } from '@app/use-cases/create-customer';
import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { ListCustomers } from '@app/use-cases/list-customers';

@Module({
  imports: [DatabaseModule],
  providers: [CreateCustomer, ListCustomers],
  controllers: [CustomerController],
})
export class HttpModule {}
