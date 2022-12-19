import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { TimeRangeParams } from 'src/core/models/time-range-params';
import { LogModel } from '../models/log-model';

export abstract class LogRepository {
  abstract list(
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    timeRangeParams: TimeRangeParams,
  ): Promise<PageList<LogModel>>;

  abstract create(log: LogModel): Promise<void>;
}
