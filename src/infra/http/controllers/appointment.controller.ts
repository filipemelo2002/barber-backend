import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAppointmentBody } from '../dtos/create-appointment-body';
import { CreateAppointment } from '@app/use-cases/create-appointment';
import { AppointmentViewModel } from '../view-model/appointment-view-model';
import { ListAppointmentsByDay } from '@app/use-cases/list-appointments-by-day';
import { ListAppointmentsByCustomerAndDay } from '@app/use-cases/list-appointments-by-customer-and-day';
import { AdminCustomerGuard } from '@infra/auth/admin-customer.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private createAppointment: CreateAppointment,
    private listAppointmentByDay: ListAppointmentsByDay,
    private listAppointmentByCustomerAndDay: ListAppointmentsByCustomerAndDay,
  ) {}
  @Post()
  @UseGuards(AdminCustomerGuard)
  async create(@Body() body: CreateAppointmentBody) {
    const { customerId, dueDate } = body;
    const { appointment } = await this.createAppointment.execute({
      customerId,
      dueDate: new Date(dueDate),
    });

    return {
      appointment: AppointmentViewModel.toHttp(appointment),
    };
  }

  @Get()
  @UseGuards(AdminCustomerGuard)
  async getByDay(@Query('dueDate') dueDate: string) {
    const { appointments } = await this.listAppointmentByDay.execute({
      dueDate: new Date(dueDate),
    });

    return {
      appointmetns: appointments.map(AppointmentViewModel.toHttp),
    };
  }

  @Get('/customer/:id')
  @UseGuards(AdminCustomerGuard)
  async getByUserAndDay(
    @Param('id') id: string,
    @Query('dueDate') dueDate?: string,
  ) {
    const { appointments } = await this.listAppointmentByCustomerAndDay.execute(
      {
        id,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    );

    return {
      apppointments: appointments.map(AppointmentViewModel.toHttp),
    };
  }
}
