import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignInAdminBody } from '../dtos/sign-in-admin-body';
import { AuthAdmin } from '@app/use-cases/auth-admin';
import { LoginViewModel } from '../view-model/login-view-model';
import { SignInCustomerBody } from '../dtos/sign-in-customer-body';
import { AuthCustomer } from '@app/use-cases/auth-customer';
import { Response } from 'express';
import { CustomerViewModel } from '../view-model/customer-view-model';

@Controller('/login')
export class LoginController {
  constructor(
    private authAdmin: AuthAdmin,
    private authCustomer: AuthCustomer,
  ) {}
  @Post('/admin')
  async signInAdmin(
    @Body() request: SignInAdminBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = request;

    const { token } = await this.authAdmin.execute({ email, password });

    response.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600 * 2),
    });

    return {
      access_token: LoginViewModel.toHTTP(token),
    };
  }

  @Post('/customer')
  async signInCustomer(
    @Body() request: SignInCustomerBody,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = request;
    const { token, customer } = await this.authCustomer.execute({
      email,
      password,
    });

    const expires = new Date(Date.now());
    expires.setDate(expires.getDate() + 2);

    response.cookie('jwt', token, {
      httpOnly: true,
      expires,
    });

    return {
      access_token: LoginViewModel.toHTTP(token),
      customer: CustomerViewModel.toHTTP(customer),
    };
  }
}
