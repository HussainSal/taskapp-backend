import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/createTaskDto';
import { Filters } from './dtos/filtersDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];

  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async getAllTask( user:User, filters?: Filters,): Promise<Task[]> {
   
   
    const tasks = await this.taskRepo.find({where:{user:user}});


    return tasks;

    // if (Object.keys(filters).length) {
    //   const { search, status } = filters;
    //   let updatedTask: Task[] = [];
    //   if (search) {
    //     updatedTask = this.tasks.filter((task) => task.title.includes(search));
    //   }
    //   if (status) {
    //     updatedTask = updatedTask.filter((task) => task.status == status);
    //   }
    //   return updatedTask;
    // } else {
    //   return this.tasks;
    // }
  }

  getTaskById(id: string): Promise<Task[]> {
    const found = this.taskRepo.find({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  async createTask(taskPayload: CreateTaskDto, user:User): Promise<Task> {
    const { title, description } = taskPayload;

    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      user:user
    };

    const res = await this.taskRepo.save(task);
    return res;
  }

  async deleteTask(id: string): Promise<any> {
    const task = await this.taskRepo.delete(id);
    return task;
  }

  // updateStatus(id: string, status: TaskStatus): Task {
  //   let updatedTask: Task;
  //   this.tasks.forEach((task) => {
  //     if (task.id === id) {
  //       task.status = status;
  //       updatedTask = task;
  //     }
  //   });

  //   return updatedTask;
  // }
}
