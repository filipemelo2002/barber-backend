import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { Injectable } from '@nestjs/common';
import { AppointmentDateConflict } from './errors/appointment-date-conflict';

interface CreateAppointmentRequest {
  customerId: string;
  dueDate: Date;
}
@Injectable()
export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async execute(request: CreateAppointmentRequest) {
    const { customerId, dueDate } = request;

    const appointmentConflict = await this.appointmentRepository.findByDate(
      dueDate,
    );

    if (appointmentConflict) {
      throw new AppointmentDateConflict();
    }

    const appointment = new Appointment({
      customerId,
      dueDate,
      createdAt: new Date(),
    });

    await this.appointmentRepository.create(appointment);

    return {
      appointment,
    };
  }
}
