import { IsNotEmpty } from 'class-validator';

export class CreateAdminBody {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateAdminBody {
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
}
