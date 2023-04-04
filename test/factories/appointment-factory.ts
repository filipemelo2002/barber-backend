import { Appointment, AppointmentProps } from '@app/entities/appointment';
import { randomUUID } from 'crypto';

type Override = Partial<AppointmentProps>;

export function makeAppointment(props: Override = {}) {
  return new Appointment({
    customerId: randomUUID(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    ...props,
  });
}
