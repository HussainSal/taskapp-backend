import { IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class Filters {

    @IsOptional()
    status?:TaskStatus
    
    @IsOptional()
    @IsString()
    search?:string
}