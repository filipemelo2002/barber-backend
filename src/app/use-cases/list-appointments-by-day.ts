import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { Injectable } from '@nestjs/common';

interface ListAppointmentsByDayRequest {
  dueDate: Date;
}
@Injectable()
export class ListAppointmentsByDay {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async execute(request: ListAppointmentsByDayRequest) {
    const { dueDate } = request;
    const appointments = await this.appointmentRepository.findByDay(dueDate);

    return {
      appointments,
    };
  }
}
