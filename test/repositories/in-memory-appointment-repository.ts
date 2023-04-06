import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';

export class InMemoryAppointmentRepository extends AppointmentRepository {
  appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const hourGap = 60 * 60 * 1000; //one hour gap at least
    const previousHour = new Date(date.getTime() - hourGap);
    const nextHour = new Date(date.getTime() + hourGap);
    return this.appointments.filter(
      ({ dueDate }) => dueDate > previousHour && dueDate < nextHour,
    )[0];
  }
}
