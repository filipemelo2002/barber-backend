import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';

interface ListAppointmentsByCustomerAndDayRequest {
  dueDate?: Date;
  id: string;
}

interface ListAppointmentsByCustomerAndDayResponse {
  appointments: Appointment[];
}
@Injectable()
export class ListAppointmentsByCustomerAndDay {
  constructor(
    private customerRepository: CustomerRepository,
    private appointmentRepository: AppointmentRepository,
  ) {}
  async execute(
    request: ListAppointmentsByCustomerAndDayRequest,
  ): Promise<ListAppointmentsByCustomerAndDayResponse> {
    const { dueDate, id } = request;
    const user = await this.customerRepository.findById(id);

    if (!user) {
      throw new CustomerNotFound();
    }

    const appointments = await this.appointmentRepository.findByUserAndDay({
      dueDate: dueDate ? new Date(dueDate) : undefined,
      customerId: id,
    });

    return {
      appointments,
    };
  }
}
