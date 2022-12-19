import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { TimeRangeParams } from 'src/core/models/time-range-params';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { LogModel } from '../../domain/models/log-model';
import { LogEntity } from './entities/log-entity';

@Injectable()
export class LogDatasource {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  async list(
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    timeRangeParams: TimeRangeParams,
  ): Promise<PageList<LogModel>> {
    const options: FindOptionsWhere<LogEntity> = {};

    if (search) {
      options.type = Like(`%${search}%`);
    }

    if (timeRangeParams.timeRange()) {
      options.created_at = timeRangeParams.timeRange();
    }

    const conditions: FindManyOptions<LogEntity> = {
      where: options,
      skip: (paginationParams.page - 1) * paginationParams.limit,
      take: paginationParams.limit,
      order: {
        [sortParams.sort]: sortParams.dir,
      },
    };

    const logs = await this.logRepository.find(conditions);
    const count = await this.logRepository.count(conditions);

    return new PageList(
      paginationParams.page,
      count,
      logs.map((log) => log.toModel()),
    );
  }

  async create(log: LogModel): Promise<void> {
    const entity = new LogEntity();
    entity.id = log.id;
    entity.type = log.type;
    entity.data = log.data;
    entity.created_at = log.createdAt;
    entity.updated_at = log.updatedAt;
    await this.logRepository.save(entity);
  }
}
