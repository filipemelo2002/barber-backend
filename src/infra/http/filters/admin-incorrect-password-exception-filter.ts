import { AdminIncorrectPassword } from '@app/use-cases/errors/admin-incorrect-password';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(AdminIncorrectPassword)
export class AdminIncorrectPasswordExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: AdminIncorrectPassword, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.BAD_REQUEST;

    const responseBody = {
      statusCode: httpStatus,
      timeStamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
