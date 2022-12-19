import { Injectable } from '@nestjs/common';
import { LogModel } from '../models/log-model';
import { LogRepository } from '../repositories/log-repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateLogUsecase {
  constructor(private readonly logRepository: LogRepository) {}

  async call(type: string, data: Record<string, any>): Promise<LogModel> {
    const log = new LogModel(uuidv4(), type, data, new Date(), new Date());
    await this.logRepository.create(log);
    return log;
  }
}
