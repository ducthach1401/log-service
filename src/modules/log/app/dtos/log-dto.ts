import { IntersectionType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from 'src/core/dtos/pagination-params-dto';
import { SortParamsDto } from 'src/core/dtos/sort-params-dto';
import { TimeRangeDto } from 'src/core/dtos/time-range-dto';

export class GetLogsQueryDto extends IntersectionType(
  IntersectionType(PaginationParamsDto, SortParamsDto),
  TimeRangeDto,
) {
  @IsOptional()
  @IsString()
  search: string | undefined;
}

export class CreateLogBodyDto {
  @IsString()
  type: string;

  @IsObject()
  data: Record<string, any>;
}
