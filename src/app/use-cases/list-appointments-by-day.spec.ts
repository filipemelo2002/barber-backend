import { makeAppointment } from '@test/factories/appointment-factory';
import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appointment-repository';
import { ListAppointmentsByDay } from './list-appointments-by-day';

describe('List Appointments by Day', () => {
  it('should list the appointments by day', async () => {
    const repository = new InMemoryAppointmentRepository();
    repository.appointments = [
      makeAppointment({ dueDate: new Date('2023-04-18') }),
      makeAppointment({ dueDate: new Date('2023-04-18') }),
      makeAppointment({ dueDate: new Date('2023-04-18') }),
      makeAppointment({ dueDate: new Date('2023-04-19') }),
    ];
    const service = new ListAppointmentsByDay(repository);

    const { appointments } = await service.execute({
      dueDate: new Date('2023-04-18'),
    });

    expect(appointments).toHaveLength(3);
  });

  it('should not list the appointments by day', async () => {
    const repository = new InMemoryAppointmentRepository();
    repository.appointments = [
      makeAppointment({ dueDate: new Date('2023-04-18') }),
      makeAppointment({ dueDate: new Date('2023-04-18') }),
      makeAppointment({ dueDate: new Date('2023-04-18') }),
    ];
    const service = new ListAppointmentsByDay(repository);

    const { appointments } = await service.execute({
      dueDate: new Date('2023-04-25'),
    });

    expect(appointments).toHaveLength(0);
  });
});
