import { IsNotEmpty } from 'class-validator';

export class SignInCustomerBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
