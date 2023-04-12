import { Body, Controller, Post } from '@nestjs/common';
import { SignInAdminBody } from '../dtos/sign-in-admin-body';
import { AuthAdmin } from '@app/use-cases/auth-admin';
import { LoginViewModel } from '../view-model/login-view-model';
import { SignInCustomerBody } from '../dtos/sign-in-customer-body';
import { AuthCustomer } from '@app/use-cases/auth-customer';

@Controller('/login')
export class LoginController {
  constructor(
    private authAdmin: AuthAdmin,
    private authCustomer: AuthCustomer,
  ) {}
  @Post('/admin')
  async signInAdmin(@Body() request: SignInAdminBody) {
    const { email, password } = request;

    const { token } = await this.authAdmin.execute({ email, password });

    return {
      access_token: LoginViewModel.toHTTP(token),
    };
  }

  @Post('/customer')
  async signInCustomer(@Body() request: SignInCustomerBody) {
    const { email, password } = request;
    const { token } = await this.authCustomer.execute({
      email,
      password,
    });

    return {
      access_token: LoginViewModel.toHTTP(token),
    };
  }
}
