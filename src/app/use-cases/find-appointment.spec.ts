import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appointment-repository';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { makeCustomer } from '@test/factories/customer-factory';
import { makeAppointment } from '@test/factories/appointment-factory';
import { CustomerNotFound } from './errors/customer-not-found';
import { FindAppointments } from './find-appointments';

describe('FindAppointment', () => {
  let customerRepository: InMemoryCustomerRepository;
  let appointmentRepository: InMemoryAppointmentRepository;

  let service: FindAppointments;
  const customer = makeCustomer();

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();
    appointmentRepository = new InMemoryAppointmentRepository();
    service = new FindAppointments(customerRepository, appointmentRepository);
    customerRepository.customers = [customer];
  });

  it("should find the customer's appointments", async () => {
    const customer = makeCustomer();
    customerRepository.customers = [customer];

    const appointment = makeAppointment({ customerId: customer.id });

    appointmentRepository.appointments = [appointment];

    const { appointments } = await service.execute({
      customerId: customer.id,
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
      customerId: customer.id,
    });
    expect(appointments).toHaveLength(3);

    ({ appointments } = await service.execute({
      customerId: customer.id,
      dueDate: new Date(Date.now()),
    }));

    expect(appointments).toHaveLength(0);

    ({ appointments } = await service.execute({
      customerId: customer.id,
      dueDate: new Date('2023-04-27'),
    }));

    expect(appointments).toHaveLength(1);
  });

  it('should not find the customer', () => {
    expect(() => {
      return service.execute({
        customerId: 'whatever-invalid-id',
      });
    }).rejects.toThrowError(CustomerNotFound);
  });

  it('should list all appointments', async () => {
    appointmentRepository.appointments = [
      makeAppointment({
        dueDate: new Date('2023-04-18'),
        customerId: customer.id + 'whatever-value',
      }),
      makeAppointment({
        dueDate: new Date('2023-04-18'),
        customerId: 'whatever-value',
      }),
      makeAppointment({
        dueDate: new Date('2023-04-30'),
        customerId: 'whatever-value-testing',
      }),
    ];
    const { appointments } = await service.execute({});
    expect(appointments).toHaveLength(3);
  });

  it('should list all appointments from a specific day', async () => {
    appointmentRepository.appointments = [
      makeAppointment({
        dueDate: new Date('2023-04-18'),
        customerId: customer.id + 'whatever-value',
      }),
      makeAppointment({
        dueDate: new Date('2023-04-18'),
        customerId: 'whatever-value',
      }),
      makeAppointment({
        dueDate: new Date('2023-04-30'),
        customerId: 'whatever-value-testing',
      }),
    ];
    const { appointments } = await service.execute({
      dueDate: new Date('2023-04-18'),
    });
    expect(appointments).toHaveLength(2);
  });
});
