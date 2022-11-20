/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TodoStatusEnum } from '../models/todoStatus.enum';
import { TimesstampEntities } from './generics.entity';

@Entity('todo')
export class TodoEntity extends TimesstampEntities{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TodoStatusEnum, default: TodoStatusEnum.waiting })
    status: TodoStatusEnum;

}