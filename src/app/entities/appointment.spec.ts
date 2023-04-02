import { randomUUID } from 'crypto';
import { Appointment } from './appointment';

describe('Appointment', () => {
  it('should create an Appointment', () => {
    const appointment = new Appointment({
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000 * 3600),
      customerId: randomUUID(),
      createdAt: new Date(),
    });

    expect(appointment).toBeTruthy();
  });

  it('should cancel an Appointment', () => {
    const appointment = new Appointment({
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000 * 3600),
      customerId: randomUUID(),
      createdAt: new Date(),
    });

    appointment.cancel();

    expect(appointment.canceledAt).toBeInstanceOf(Date);
  });
});
