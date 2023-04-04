import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentBody {
  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  dueDate: Date;
}
