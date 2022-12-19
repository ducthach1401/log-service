import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { TimeRangeParams } from 'src/core/models/time-range-params';
import { LogModel } from '../../domain/models/log-model';
import { LogRepository } from '../../domain/repositories/log-repository';
import { LogDatasource } from '../database/log-datasource';

@Injectable()
export class LogRepositoryImpl extends LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {
    super();
  }

  async list(
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    timeRangeParams: TimeRangeParams,
  ): Promise<PageList<LogModel>> {
    return await this.logDatasource.list(
      search,
      paginationParams,
      sortParams,
      timeRangeParams,
    );
  }

  async create(log: LogModel): Promise<void> {
    return await this.logDatasource.create(log);
  }
}
