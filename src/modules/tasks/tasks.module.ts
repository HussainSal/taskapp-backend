import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule , TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  // This allows as to import the service in controller
  providers: [TasksService],
})
export class TasksModule {}
