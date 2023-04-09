import { IsNotEmpty } from 'class-validator';

export class SignInAdminBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
