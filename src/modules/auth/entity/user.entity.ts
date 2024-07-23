import { Task } from 'src/modules/tasks/entities/task.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // First argument is the type, the second argument is how to access this user from other side of the relation, i.e from the task side

  @OneToMany(_type => Task,(task) => task.user, {eager:true} )
  tasks: Task[]
}
