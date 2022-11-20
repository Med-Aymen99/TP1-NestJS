/* eslint-disable prettier/prettier */

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { TodoEntity } from './entities/Todo.entity';
import { Todo } from './models/todo.model';

@Injectable()
export class TodoService {
    todos : Todo[] = [];
    @Inject ('UUID') uuid;

    getTodos() :Todo[] {
        return this.todos;
    }
    
    addTodo(
        newTodo : AddTodoDto
    ) {
        const {name, description} = newTodo;
        
        const todo = new Todo(name, description, new Date(), this.uuid() );
        this.todos.push(todo);
        return todo;
    }



    getTodobyId(id : string){
        const todo = this.todos.find((currentTodo) => currentTodo.id == id)
        if (todo)
            return todo;
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }

    deleteTodo(id : string) {
        const index = this.todos.findIndex((todo) => todo.id == id);
        if (index >= 0) {
            this.todos.splice(index,1);
            console.log("element deleted");
        } else {
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`)
        }
        
        return {
            message: `Le todo d'id ${id} a été supprimé`,
            count: 1
        }
    }

    updateTodo(id : string , newTodo : UpdateTodoDto){
        const todo = this.getTodobyId(id);
        //todo.description = newTodo.description? newTodo.description : todo.description
        todo.description = newTodo.description?? todo.description
        todo.name = newTodo.name?? todo.name
        return todo
    }
    
}