import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateCustomerBody {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
}
