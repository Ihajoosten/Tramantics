import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  GoneException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Capture the error message
    let errorMessage = 'Internal Server Error';

    // Handle specific exceptions
    if (exception instanceof NotFoundException) {
      errorMessage = `Resource not found :: ${exception.message} `;
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof UnauthorizedException) {
      errorMessage = `Authorization Failed :: ${exception.message} `;
      status = HttpStatus.UNAUTHORIZED;
    } else if (exception instanceof ForbiddenException) {
      errorMessage = `Forbidden :: ${exception.message} `;
      status = HttpStatus.FORBIDDEN;
    } else if (exception instanceof BadRequestException) {
      errorMessage = `Bad Request :: ${exception.message} `;
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InternalServerErrorException) {
      errorMessage = `Internal server Error :: ${exception.message} `;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof NotAcceptableException) {
      errorMessage = `Not Acceptable :: ${exception.message} `;
      status = HttpStatus.NOT_ACCEPTABLE;
    } else if (exception instanceof ConflictException) {
      errorMessage = `Conflict :: ${exception.message} `;
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof GoneException) {
      errorMessage = `Gone :: ${exception.message} `;
      status = HttpStatus.GONE;
    } else if (exception instanceof ServiceUnavailableException) {
      errorMessage = `Service Unavailable :: ${exception.message} `;
      status = HttpStatus.SERVICE_UNAVAILABLE;
    }

    // Send a response to the client
    response.status(status).json({
      status_code: status,
      timestamp: new Date().toLocaleString(),
      ip_address: getIPAddress(),
      path: request.url,
      errorMessage,
    });
  }
}

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      )
        return alias.address;
    }
  }
  return '0.0.0.0';
}
