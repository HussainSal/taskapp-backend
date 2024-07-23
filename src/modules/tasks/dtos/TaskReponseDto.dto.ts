import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../task.model";
import { Expose } from "class-transformer";

export class TaskReponseDTO {

    @Expose()
    @IsString()
    id:string
    @Expose()
    @IsString()
    title: string;
    @Expose()
    @IsString()
    description: string;
    @Expose()
    @IsEnum(TaskStatus)
    status: TaskStatus 

}