import { IsDateString, IsOptional } from 'class-validator';

export class TimeRangeDto {
  @IsOptional()
  @IsDateString()
  from_time: Date;

  @IsOptional()
  @IsDateString()
  to_time: Date;
}
