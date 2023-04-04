import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appointment-repository';
import { CreateAppointment } from './create-appointment';

describe('Create Appointment', () => {
  it('should create an appointment', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    const { appointment } = await createAppointment.execute({
      customerId: 'whatever-non-existing-id',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });

    expect(appointmentRepository.appointments).toHaveLength(1);
    expect(appointmentRepository.appointments[0]).toEqual(appointment);
  });
});
