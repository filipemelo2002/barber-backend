import { Body, Controller, Post } from '@nestjs/common';
import { CreateAppointmentBody } from '../dtos/create-appointment-body';
import { CreateAppointment } from '@app/use-cases/create-appointment';
import { AppointmentViewModel } from '../view-model/appointment-view-model';

@Controller('appointments')
export class AppointmentController {
  constructor(private createAppointment: CreateAppointment) {}
  @Post()
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
}
