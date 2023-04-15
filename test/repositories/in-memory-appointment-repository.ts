import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { MINIMUM_APPOINTMENT_TIME_GAP } from '@constants/appointment';

export class InMemoryAppointmentRepository extends AppointmentRepository {
  appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const previousHour = new Date(
      date.getTime() - MINIMUM_APPOINTMENT_TIME_GAP,
    );
    const nextHour = new Date(date.getTime() + MINIMUM_APPOINTMENT_TIME_GAP);
    return this.appointments.filter(
      ({ dueDate }) => dueDate > previousHour && dueDate < nextHour,
    )[0];
  }

  async findByDay(date: Date): Promise<Appointment[]> {
    return this.appointments.filter(({ dueDate }) => {
      return this.isSameDay(dueDate, date);
    });
  }

  private isSameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
}
