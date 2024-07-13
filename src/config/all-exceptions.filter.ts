import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? typeof exception.getResponse() === 'string' ? exception.getResponse() : (exception.getResponse() as any).message || (exception.getResponse() as any).error || 'Internal server error'
        : (exception as any).message || (exception as any).error || 'Internal server error'

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}