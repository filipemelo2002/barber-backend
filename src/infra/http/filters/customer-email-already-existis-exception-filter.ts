import { CustomerEmailAlreadyExists } from '@app/use-cases/errors/customer-email-already-exists';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(CustomerEmailAlreadyExists)
export class CustomerEmailAlreadyExistsExceptionFilter
  implements ExceptionFilter
{
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: CustomerEmailAlreadyExists, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.CONFLICT;

    const responseBody = {
      statusCode: httpStatus,
      timeStamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
      field: 'email',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
