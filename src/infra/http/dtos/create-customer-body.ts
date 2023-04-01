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

export class UpdateCustomerBody {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
}
