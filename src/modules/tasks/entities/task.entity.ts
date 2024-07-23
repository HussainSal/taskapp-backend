import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../task.model";
import { User } from "src/modules/auth/entity/user.entity";
import { Exclude } from "class-transformer";

 

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column()
    description:string;

    
    @Column()
    status:TaskStatus;

    @ManyToOne(_type => User, (user) => user.tasks, {eager:false})
    @Exclude({toPlainOnly:true})
    user:User
}