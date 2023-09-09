import {
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpResponseException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      meta: {
        success:
          exception.response.statusCode >= 200 &&
          exception.response.statusCode <= 300
            ? true
            : false,
        message: exception?.message || exception.response,
        devMessage: exception?.devMessage || '',
      },
      body: null,
    });
  }
}
