import { NextFunction, Request, Response } from 'express';
import HttpException from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import LoggerService from '@/services/logger.service';
const loggerService = new LoggerService();

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    const url = req.url || '';
    const method = req.method;
    const body = JSON.stringify(req.body);
    const ip = getClientIp(req);

    try {
      loggerService.insertOrUpdateLogger({
        url,
        method,
        params:"",
        body,
        ip,
        status,
        message
      })
    } catch (error) {
      logger.error(`logger error: ${error}`)
    }

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

const getClientIp = req => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

export default errorMiddleware;
