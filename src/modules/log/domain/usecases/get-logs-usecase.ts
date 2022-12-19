import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { TimeRangeParams } from 'src/core/models/time-range-params';
import { LogModel } from '../models/log-model';
import { LogRepository } from '../repositories/log-repository';

@Injectable()
export class GetLogsUsecase {
  constructor(private readonly logRepository: LogRepository) {}

  async call(
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    timeRangeParams: TimeRangeParams,
  ): Promise<PageList<LogModel>> {
    return await this.logRepository.list(
      search,
      paginationParams,
      sortParams,
      timeRangeParams,
    );
  }
}
