import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from './app/http/controllers/log-controller';
import { LogEntity } from './data/database/entities/log-entity';
import { LogDatasource } from './data/database/log-datasource';
import { LogRepositoryImpl } from './data/repositories/log-repository-impl';
import { LogRepository } from './domain/repositories/log-repository';
import { CreateLogUsecase } from './domain/usecases/create-log-usecase';
import { GetLogsUsecase } from './domain/usecases/get-logs-usecase';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  controllers: [LogController],
  providers: [
    {
      provide: LogRepository,
      useClass: LogRepositoryImpl,
    },
    LogDatasource,
    GetLogsUsecase,
    CreateLogUsecase,
  ],
})
export class LogModule {}
