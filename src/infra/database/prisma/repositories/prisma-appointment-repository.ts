import { Appointment } from '@app/entities/appointment';
import { AppointmentRepository } from '@app/repositories/appointment-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAppointmentMapper } from '../mappers/prisma-appointment-mapper';

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
    const hourGap = 60 * 60 * 1000;
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        dueDate: {
          gte: new Date(date.getTime() - hourGap),
          lt: new Date(date.getTime() + hourGap),
        },
      },
    });

    if (appointments.length === 0) {
      return;
    }
    return PrismaAppointmentMapper.toDomain(appointments[0]);
  }
}
