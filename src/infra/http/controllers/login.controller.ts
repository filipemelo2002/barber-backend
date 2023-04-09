import { Body, Controller, Post } from '@nestjs/common';
import { SignInAdminBody } from '../dtos/sign-in-admin-body';
import { AuthAdmin } from '@app/use-cases/auth-admin';
import { LoginViewModel } from '../view-model/login-view-model';

@Controller('/login')
export class LoginController {
  constructor(private authAdmin: AuthAdmin) {}
  @Post('/admin')
  async signInAdmin(@Body() request: SignInAdminBody) {
    const { email, password } = request;

    const { token } = await this.authAdmin.execute({ email, password });

    return {
      token: LoginViewModel.toHTTP(token),
    };
  }
}
