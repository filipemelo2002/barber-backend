import { Appointment } from '@app/entities/appointment';
import {
  AppointmentRepository,
  AppointmentRepositoryFindByUserAndDayRequest,
} from '@app/repositories/appointment-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAppointmentMapper } from '../mappers/prisma-appointment-mapper';
import { MINIMUM_APPOINTMENT_TIME_GAP } from '@constants/appointment';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prismaService: PrismaService) {}
  async create(appointment: Appointment): Promise<void> {
    const raw = PrismaAppointmentMapper.toPrisma(appointment);
    await this.prismaService.appointment.create({
      data: raw,
    });
  }
  async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        dueDate: {
          gte: new Date(date.getTime() - MINIMUM_APPOINTMENT_TIME_GAP),
          lt: new Date(date.getTime() + MINIMUM_APPOINTMENT_TIME_GAP),
        },
      },
    });

    if (appointments.length === 0) {
      return;
    }
    return PrismaAppointmentMapper.toDomain(appointments[0]);
  }

  async findByDay(date: Date): Promise<Appointment[]> {
    const raw = await this.prismaService.appointment.findMany({
      where: {
        dueDate: {
          lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
          gte: date,
        },
      },
    });

    return raw.map(PrismaAppointmentMapper.toDomain);
  }
  async findByUserAndDay(
    request: AppointmentRepositoryFindByUserAndDayRequest,
  ): Promise<Appointment[]> {
    const { dueDate, customerId } = request;

    const dueDateQuery = dueDate
      ? {
          dueDate: {
            lt: new Date(dueDate.getTime() + 24 * 60 * 60 * 1000),
            gte: dueDate,
          },
        }
      : {};
    const raw = await this.prismaService.appointment.findMany({
      where: {
        customerId,
        ...dueDateQuery,
      },
    });
    return raw.map(PrismaAppointmentMapper.toDomain);
  }

  async find(
    request: AppointmentRepositoryFindByUserAndDayRequest,
  ): Promise<Appointment[]> {
    const { dueDate, customerId } = request;
    const customerIdQuery = customerId
      ? {
          customerId,
        }
      : {};

    const dueDateQuery = dueDate
      ? {
          dueDate: {
            lt: new Date(dueDate.getTime() + 24 * 60 * 60 * 1000),
            gte: dueDate,
          },
        }
      : {};

    const raw = await this.prismaService.appointment.findMany({
      where: {
        ...customerIdQuery,
        ...dueDateQuery,
      },
    });

    return raw.map(PrismaAppointmentMapper.toDomain);
  }
}
