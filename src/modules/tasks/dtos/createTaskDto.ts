import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';
// import { TaskStatus } from "../task.model"

export class CreateTaskDto {
  // @IsString()
  // @IsNotEmpty()
  // id:string

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus = TaskStatus.OPEN;
}
