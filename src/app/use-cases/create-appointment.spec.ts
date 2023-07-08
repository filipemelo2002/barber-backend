import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appointment-repository';
import { CreateAppointment } from './create-appointment';

describe('Create Appointment', () => {
  it('should create an appointment', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    const { appointment } = await createAppointment.execute({
      customerId: 'whatever-non-existing-id',
      dueDate: new Date('2023-04-06T01:44:36.248Z'),
    });
    await createAppointment.execute({
      customerId: 'whatever-non-existing-id',
      dueDate: new Date('2023-04-06T02:44:36.248Z'),
    });
    await createAppointment.execute({
      customerId: 'whatever-non-existing-id',
      dueDate: new Date('2023-04-06T00:44:36.248Z'),
    });

    expect(appointmentRepository.appointments).toHaveLength(3);
    expect(appointmentRepository.appointments[0]).toEqual(appointment);
  });
});
