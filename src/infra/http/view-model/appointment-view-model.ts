import { Appointment } from '@app/entities/appointment';

export class AppointmentViewModel {
  static toHttp(appointment: Appointment) {
    return {
      id: appointment.id,
      customerId: appointment.customerId,
      dueDate: appointment.dueDate,
      createdAt: appointment.createdAt,
      canceledAt: appointment.canceledAt,
    };
  }
}
