import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentBody {
  customerId?: string;

  @IsNotEmpty()
  dueDate: string;
}
