import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';
import { Appointment } from '@app/entities/appointment';

interface FindAppointmentsRequest {
  customerId?: string;
  dueDate?: Date;
}

interface FindAppointmentsResponse {
  appointments: Appointment[];
}
@Injectable()
export class FindAppointments {
  constructor(
    private customerRepository: CustomerRepository,
    private appointmentRepository: AppointmentRepository,
  ) {}

  async execute(
    request: FindAppointmentsRequest,
  ): Promise<FindAppointmentsResponse> {
    const { customerId, dueDate } = request;

    if (customerId) {
      const customer = await this.customerRepository.findById(customerId);

      if (!customer) {
        throw new CustomerNotFound();
      }
    }

    const appointments = await this.appointmentRepository.find({
      customerId,
      dueDate,
    });

    return {
      appointments,
    };
  }
}
