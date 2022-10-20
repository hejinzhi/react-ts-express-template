import { Logger } from './../entity/logger.entity';
import { getRepository } from 'typeorm';

import { LoggerProps } from '@/interfaces/index.interface';

class LoggerService {
  public logger = Logger;

  public async insertOrUpdateLogger(body: LoggerProps) {
    const loggerRepository = getRepository(this.logger);
    const log = await loggerRepository.save(body);
    return log;
  }

}

export default LoggerService;
