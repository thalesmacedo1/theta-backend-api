import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    console.log(
      `[${new Date().toISOString()}] ${method} ${originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`,
    );

    if (method !== 'GET') {
      console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      console.log(
        `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      );
    });

    next();
  }
}
