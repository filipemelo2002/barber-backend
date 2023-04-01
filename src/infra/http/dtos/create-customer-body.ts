import { IsNotEmpty } from 'class-validator';

export class CreateCustomerBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
