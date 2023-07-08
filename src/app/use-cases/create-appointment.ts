import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { Injectable } from '@nestjs/common';

interface CreateAppointmentRequest {
  customerId?: string;
  dueDate: Date;
}
@Injectable()
export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async execute(request: CreateAppointmentRequest) {
    const { dueDate, customerId } = request;

    const appointment = new Appointment({
      dueDate,
      customerId,
      createdAt: new Date(),
    });

    await this.appointmentRepository.create(appointment);

    return {
      appointment,
    };
  }
}
