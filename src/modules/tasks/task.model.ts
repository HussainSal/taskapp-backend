import { IsEnum, IsNotEmpty } from 'class-validator';
import { User } from '../auth/entity/user.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  user:User
}

export class UpdateStatus {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
