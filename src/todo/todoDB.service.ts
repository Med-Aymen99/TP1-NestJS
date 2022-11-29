/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Like, QueryBuilder, Repository } from 'typeorm';
import { AddTodoDto } from './DTO/add-todo.dto';
import { filterTodoDto } from './DTO/filter-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { TodoEntity } from './entities/Todo.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
  

@Injectable()
export class TodoDBService {

    constructor(
        @InjectRepository(TodoEntity)
        private todoRepo: Repository<TodoEntity>,
         
    ) {}

    async addTodoDB(todo: AddTodoDto) : Promise<TodoEntity>{
        return await this.todoRepo.save(todo);
    }

    async gettodoDBparamOR(mesQueryParams : filterTodoDto) : Promise<TodoEntity[]> {
        return await this.todoRepo.find(
            {
                where : [
                    {
                        status: mesQueryParams.status
                    },
                    //OR
                    {
                        name: Like(`%${mesQueryParams.chaine}%`)
                    },
                    //OR
                    {
                        description: Like(`%${mesQueryParams.chaine}%`)
                    }
                ]
            }
        )
    }

    async gettodoDBparamAND(mesQueryParams : filterTodoDto) : Promise<TodoEntity[]> {
        return await this.todoRepo.find(
            {
                where : [
                    {
                        name: Like(`%${mesQueryParams.chaine}%`),
                        status: mesQueryParams.status
                    },
                    //OR
                    {
                        description: Like(`%${mesQueryParams.chaine}%`),
                        status: mesQueryParams.status
                    }
                ]
            }
        )
    }
    
    // async gettodoDBparamAND(mesQueryParams : filterTodoDto) : Promise<TodoEntity[]> {
    //     const qd = this.todoRepo.createQueryBuilder("todo");
    //     qd.where(`todo.status ='${mesQueryParams.status}' `).andWhere(`( todo.name LIKE '%${mesQueryParams.chaine}%' `)
    //     .orWhere(`todo.description LIKE '%${mesQueryParams.chaine}%' )`);
    //     console.log(qd.getSql());
    //     return await qd.getRawMany();
    // }

    async gettodoDB() : Promise<TodoEntity[]> {
        return await this.todoRepo.find();
    }

    async updateTodo(id : number , todo : UpdateTodoDto){
        const newTodo = await this.todoRepo.preload({
            id,
            ...todo
        })
        if (!newTodo) {
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`)

        }
        return await this.todoRepo.save(newTodo);
    }

    async findById(id: number ) {
        const todo = await this.todoRepo.findOneBy({
            id : id
        })
        if (! todo) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`)
        }
        return todo;
    }

    async removeTodo(id: number) {
        const todo = await this.findById(id);
        return await this.todoRepo.remove(todo);
    }

    
    async softRemoveTodo(id: number) {
        const todo = await this.findById(id);
        return await this.todoRepo.softRemove(todo);
    }
    async recoverTodo(id: number) {
        const todo = await this.findById(id);
        return await this.todoRepo.restore(todo);
    }


    async softDeleteTodo(id: number) {
        return await this.todoRepo.softDelete(id);
    }
    async restoreTodo(id: number) {
        return await this.todoRepo.restore(id);
    }
    
    async groupByStatus() {
        const qd = this.todoRepo.createQueryBuilder("todo");
        qd.select("todo.status, count(todo.id) as TodoNumber")
            .groupBy("todo.status");
        console.log(qd.getSql());
        return await qd.getRawMany();

    }
    async paginate(options: IPaginationOptions): Promise<Pagination <TodoEntity>> {
        
        const queryBuilder = this.todoRepo.createQueryBuilder('todo');
        queryBuilder.orderBy('todo.id', 'ASC');

        return paginate<TodoEntity>(this.todoRepo, options);
      }
    
}
