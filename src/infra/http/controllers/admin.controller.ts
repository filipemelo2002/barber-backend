import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAdminBody } from '../dtos/create-admin-body';
import { CreateAdmin } from '@app/use-cases/create-admin';
import { AdminViewModel } from '../view-model/admin-view-model';
import { ListAdmins } from '@app/use-cases/list-admins';

@Controller('/admins')
export class AdminController {
  constructor(
    private createAdmin: CreateAdmin,
    private listAdmins: ListAdmins,
  ) {}

  @Get()
  async list() {
    const { admins } = await this.listAdmins.execute();

    return {
      admins: admins.map(AdminViewModel.toHTTP),
    };
  }

  @Post()
  async create(@Body() body: CreateAdminBody) {
    const { email, name, phone, password } = body;

    const { admin } = await this.createAdmin.execute({
      email,
      name,
      phone,
      password,
    });

    return {
      admin: AdminViewModel.toHTTP(admin),
    };
  }
}
