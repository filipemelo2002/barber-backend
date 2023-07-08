import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateAppointmentBody } from '../dtos/create-appointment-body';
import { CreateAppointment } from '@app/use-cases/create-appointment';
import { AppointmentViewModel } from '../view-model/appointment-view-model';
import { AdminCustomerGuard } from '@infra/auth/admin-customer.guard';
import { FindAppointments } from '@app/use-cases/find-appointments';
import { AdminGuard } from '@infra/auth/admin.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private createAppointment: CreateAppointment,
    private findAppointments: FindAppointments,
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

  @Get()
  @UseGuards(AdminCustomerGuard)
  async getByUserAndDay(
    @Query('customerId') id?: string,
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
}
