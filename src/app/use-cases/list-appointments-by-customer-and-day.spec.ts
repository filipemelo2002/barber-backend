import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appointment-repository';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { ListAppointmentsByCustomerAndDay } from './list-appointments-by-customer-and-day';
import { makeCustomer } from '@test/factories/customer-factory';
import { makeAppointment } from '@test/factories/appointment-factory';
import { CustomerNotFound } from './errors/customer-not-found';

describe('FindAppointmentsByUserAndDay', () => {
  let customerRepository: InMemoryCustomerRepository;
  let appointmentRepository: InMemoryAppointmentRepository;

  let service: ListAppointmentsByCustomerAndDay;
  const customer = makeCustomer();

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    appointmentRepository = new InMemoryAppointmentRepository();
    service = new ListAppointmentsByCustomerAndDay(
      customerRepository,
      appointmentRepository,
    );
    customerRepository.customers = [customer];
  });

  it("should find the customer's appointments", async () => {
    const customer = makeCustomer();
    customerRepository.customers = [customer];

    const appointment = makeAppointment({ customerId: customer.id });

    appointmentRepository.appointments = [appointment];

    const { appointments } = await service.execute({
      id: customer.id,
      dueDate: appointment.dueDate,
    });

    expect(appointments).toHaveLength(1);
  });

  it("should list all customer's appointments", async () => {
    appointmentRepository.appointments = [
      makeAppointment({
        dueDate: new Date('2023-04-18'),
        customerId: customer.id,
      }),
      makeAppointment({
        dueDate: new Date('2023-04-18'),
        customerId: customer.id,
      }),
      makeAppointment({
        dueDate: new Date('2023-04-27'),
        customerId: customer.id,
      }),
    ];

    let { appointments } = await service.execute({
      id: customer.id,
    });
    expect(appointments).toHaveLength(3);

    ({ appointments } = await service.execute({
      id: customer.id,
      dueDate: new Date(Date.now()),
    }));

    expect(appointments).toHaveLength(0);

    ({ appointments } = await service.execute({
      id: customer.id,
      dueDate: new Date('2023-04-27'),
    }));

    expect(appointments).toHaveLength(1);
  });

  it('should not find the customer', () => {
    expect(() => {
      return service.execute({
        id: 'whatever-invalid-id',
      });
    }).rejects.toThrowError(CustomerNotFound);
  });
});
