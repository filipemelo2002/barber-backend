import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAdminBody, UpdateAdminBody } from '../dtos/create-admin-body';
import { CreateAdmin } from '@app/use-cases/create-admin';
import { AdminViewModel } from '../view-model/admin-view-model';
import { ListAdmins } from '@app/use-cases/list-admins';
import { UpdateAdmin } from '@app/use-cases/update-admin';
import { DeleteAdmin } from '@app/use-cases/delete-admin';
import { GetAdmin } from '@app/use-cases/get-admin';

@Controller('/admins')
export class AdminController {
  constructor(
    private createAdmin: CreateAdmin,
    private listAdmins: ListAdmins,
    private updateAdmin: UpdateAdmin,
    private deleteAdmin: DeleteAdmin,
    private getAdmin: GetAdmin,
  ) {}

  @Get()
  async list() {
    const { admins } = await this.listAdmins.execute();

    return {
      admins: admins.map(AdminViewModel.toHTTP),
    };
  }

  @Get(':adminId')
  async show(@Param('adminId') id: string) {
    const { admin } = await this.getAdmin.execute({ adminId: id });

    return { admin: AdminViewModel.toHTTP(admin) };
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

  @Put(':adminId')
  async update(@Body() body: UpdateAdminBody, @Param('adminId') id: string) {
    const { name, email, phone, password } = body;
    const { admin } = await this.updateAdmin.execute({
      name,
      email,
      phone,
      password,
      id,
    });

    return {
      admin: AdminViewModel.toHTTP(admin),
    };
  }

  @Delete(':adminId')
  async delete(@Param('adminId') id: string) {
    await this.deleteAdmin.execute({ id });
  }
}
