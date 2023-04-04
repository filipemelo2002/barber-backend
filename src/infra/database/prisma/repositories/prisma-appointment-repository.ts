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
}
