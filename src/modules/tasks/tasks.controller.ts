import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, UpdateStatus } from './task.model';
import { CreateTaskDto } from './dtos/createTaskDto';
import { Filters } from './dtos/filtersDto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { TaskReponseDTO } from './dtos/TaskReponseDto.dto';

@Controller('tasks')
@ApiTags('Tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTask(@GetUser() user:User, @Query() filterDto: Filters): Promise<Task[]> {
    return this.taskService.getAllTask(user,filterDto,);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task[]> {
    return this.taskService.getTaskById(id);
  }

  @Post()
   async createTask(@GetUser() user :User, @Body() createTaskDto: CreateTaskDto): Promise<TaskReponseDTO> {


    const task = await this.taskService.createTask(createTaskDto, user);
     const result = plainToInstance(TaskReponseDTO,task,{excludeExtraneousValues:true})
     return result
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }

}
