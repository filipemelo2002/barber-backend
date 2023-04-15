import { Appointment } from '@app/entities/appointment';

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract findByDate(date: Date): Promise<Appointment | undefined>;
  abstract findByDay(date: Date): Promise<Appointment[]>;
}
