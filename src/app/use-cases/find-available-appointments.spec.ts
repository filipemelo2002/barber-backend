import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appointment-repository';
import { FindAvailableAppointments } from './find-available-appointments';
import { makeAppointment } from '@test/factories/appointment-factory';

describe('FindAvailableAppointments', () => {
  it('should list all available appointments at give day', async () => {
    const repository = new InMemoryAppointmentRepository();
    const service = new FindAvailableAppointments(repository);

    const appointment = makeAppointment({
      dueDate: new Date(Date.now()),
      customerId: null,
    });

    repository.create(appointment);

    const { appointments } = await service.execute({
      dueDate: new Date(Date.now()),
    });

    expect(appointments.length).toEqual(1);
  });

  it('should not list duplicate available appointments at give day', async () => {
    const repository = new InMemoryAppointmentRepository();
    const service = new FindAvailableAppointments(repository);

    repository.appointments = [
      makeAppointment({
        dueDate: new Date(Date.now()),
      }),
      makeAppointment({
        dueDate: new Date(Date.now()),
        customerId: null,
      }),
      makeAppointment({
        dueDate: new Date(Date.now()),
        customerId: null,
      }),
    ];

    const { appointments } = await service.execute({
      dueDate: new Date(Date.now()),
    });

    expect(appointments.length).toEqual(1);
  });
});
