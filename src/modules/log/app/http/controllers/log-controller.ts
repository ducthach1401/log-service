import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { normalizeResponseData } from 'src/core/helpers/utils';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { TimeRangeParams } from 'src/core/models/time-range-params';
import { CreateLogUsecase } from 'src/modules/log/domain/usecases/create-log-usecase';
import { GetLogsUsecase } from 'src/modules/log/domain/usecases/get-logs-usecase';
import { CreateLogBodyDto, GetLogsQueryDto } from '../../dtos/log-dto';

@Controller('api/v1/log')
export class LogController {
  constructor(
    private readonly getLogsUsecase: GetLogsUsecase,
    private readonly createLogUsecase: CreateLogUsecase,
  ) {}

  @Get()
  async list(@Query() query: GetLogsQueryDto, @Res() res: Response) {
    const logs = await this.getLogsUsecase.call(
      query.search,
      new PaginationParams(
        query.page,
        query.limit,
        query.need_total_count,
        query.only_count,
      ),
      new SortParams(query.sort, query.dir),
      new TimeRangeParams(query.from_time, query.to_time),
    );
    if (logs.totalCount) {
      res.setHeader('X-total-count', logs.totalCount);
    }

    res.status(HttpStatus.OK).json(normalizeResponseData(logs));
  }

  @Post()
  async create(@Body() body: CreateLogBodyDto, @Res() res: Response) {
    const log = await this.createLogUsecase.call(body.type, body.data);
    res.status(HttpStatus.OK).json(normalizeResponseData(log));
  }
}
