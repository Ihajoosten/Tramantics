// src/middleware/logging.middleware.ts
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: any, res: any, next: () => void) {
    // Log the request
    this.logRequest(req);

    res.on('finish', () => {
      const { statusCode } = res;

      // Log the response
      this.logResponse('Response', {
        statusCode,
        headers: res.getHeaders(),
        body: res.locals.body,
      });

      if (statusCode >= 400) {
        // Log an error for non-successful responses
        this.logError({ message: `HTTP error ${statusCode}` }, 'Error', null);
      }
    });

    res.on('error', (err) => {
      // Log an error if an error occurs during the response
      this.logError(err, 'Error', err.stack);
    });

    next();
  }

  private logRequest(req: any) {
    const { method, originalUrl, httpVersion, statusCode, ip } = req;
    const timestamp = new Date().toLocaleString();

    this.logger.verbose(
      `Request: ${method} ${originalUrl} (HTTP/${httpVersion}) - Status: ${statusCode} - IP: ${ip} - Timestamp: ${timestamp}`,
    );
  }

  private logResponse(context: string, responseLog: any) {
    const timestamp = new Date().toLocaleString();

    this.logger.verbose(
      `Response for ${context} - Status: ${
        responseLog.statusCode
      } - Headers: ${JSON.stringify(
        responseLog.headers,
      )} - Body: ${JSON.stringify(responseLog.body)} - Timestamp: ${timestamp}`,
    );
  }

  private logError(error: any, context: string, errorStack: string | null) {
    const timestamp = new Date().toLocaleString();

    this.logger.error(
      `Context :: ${context} - Error :: ${error.message} - ErrorStack :: ${errorStack} - Timestamp: ${timestamp}`,
    );
  }
}
