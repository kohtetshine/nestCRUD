import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
