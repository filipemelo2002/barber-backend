import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { AppointmentNotFound } from './errors/appointment-not-found';
import { Injectable } from '@nestjs/common';

interface FindAvailableAppointmentsRequest {
  dueDate: Date;
}

interface FindAvailableAppointmentsResponse {
  appointments: Appointment[];
}
@Injectable()
export class FindAvailableAppointments {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    dueDate,
  }: FindAvailableAppointmentsRequest): Promise<FindAvailableAppointmentsResponse> {
    const appointmentsAux = await this.appointmentRepository.find({
      dueDate,
    });

    const appointments = appointmentsAux.filter(
      (appointment) => !appointment.customerId,
    );

    if (appointments.length === 0) {
      throw new AppointmentNotFound();
    }

    const appointmentsWithoutDuplicates = appointments.filter(
      (appointment, index, self) =>
        index ===
        self.findIndex(
          ({ dueDate }) => dueDate.getTime() === appointment.dueDate.getTime(),
        ),
    );

    return {
      appointments: appointmentsWithoutDuplicates,
    };
  }
}
