import { Appointment } from '@app/entities/appointment';
import { Appointment as RawAppointment } from '@prisma/client';
export class PrismaAppointmentMapper {
  static toPrisma(appointment: Appointment) {
    return {
      id: appointment.id,
      customerId: appointment.customerId,
      dueDate: appointment.dueDate,
      createdAt: appointment.createdAt,
      canceledAt: appointment.canceledAt,
    };
  }

  static toDomain(appointment: RawAppointment) {
    return new Appointment(
      {
        createdAt: appointment.createdAt,
        dueDate: appointment.dueDate,
        customerId: appointment.customerId,
        canceledAt: appointment.canceledAt,
      },
      appointment.id,
    );
  }
}
