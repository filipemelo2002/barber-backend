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
import { AdminCustomerGuard } from '@infra/auth/admin-customer.guard';
import { FindAppointments } from '@app/use-cases/find-appointments';
import { AdminGuard } from '@infra/auth/admin.guard';
import { FindAvailableAppointments } from '@app/use-cases/find-available-appointments';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private createAppointment: CreateAppointment,
    private findAppointments: FindAppointments,
    private findAvailableAppointments: FindAvailableAppointments,
  ) {}
  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() body: CreateAppointmentBody) {
    const { dueDate, customerId } = body;
    const { appointment } = await this.createAppointment.execute({
      dueDate: new Date(dueDate),
      customerId,
    });

    return {
      appointment: AppointmentViewModel.toHttp(appointment),
    };
  }

  @Get('/:customerId')
  @UseGuards(AdminCustomerGuard)
  async getByUserAndDay(
    @Param('customerId') id?: string,
    @Query('dueDate') dueDate?: string,
  ) {
    const { appointments } = await this.findAppointments.execute({
      customerId: id,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return {
      apppointments: appointments.map(AppointmentViewModel.toHttp),
    };
  }

  @Get()
  async getByDay(@Query('dueDate') dueDate: string) {
    const { appointments } = await this.findAvailableAppointments.execute({
      dueDate: new Date(dueDate),
    });

    return {
      appointments: appointments.map(AppointmentViewModel.toHttp),
    };
  }
}
