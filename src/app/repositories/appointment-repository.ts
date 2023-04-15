import { Appointment } from '@app/entities/appointment';

export interface AppointmentRepositoryFindByUserAndDayRequest {
  dueDate: Date | undefined;
  customerId: string;
}
export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract findByDate(date: Date): Promise<Appointment | undefined>;
  abstract findByDay(date: Date): Promise<Appointment[]>;
  abstract findByUserAndDay(
    request: AppointmentRepositoryFindByUserAndDayRequest,
  ): Promise<Appointment[]>;
}
