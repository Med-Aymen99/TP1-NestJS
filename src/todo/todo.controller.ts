/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { MyPipe } from 'src/pipes/my-pipe.pipe';
import { TodoDBService } from './todoDB.service';
import { AddTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { TodoEntity } from './entities/Todo.entity';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    @Inject ('UUID') uuid ;

    constructor(private todoService: TodoService, private todoDBService: TodoDBService) {
    }

    @Get()
    getTodos(
    ) : Todo[] {
        return this.todoService.getTodos();
    }
  
    @Get(':id')
    getTodoById(
        @Param('id') id
    ) {
        return this.todoService.getTodobyId(id);
    }

    @Post()
    addTodo(
        @Body() newTodo : AddTodoDto
    ) :Todo {
        return this.todoService.addTodo(newTodo);
    }

    @Post('/db')
    async addTodoDB(
        @Body() newTodo : AddTodoDto
    ) : Promise<TodoEntity> {
        return await this.todoDBService.addTodoDB(newTodo);
    }

    @Post('pipe')
    testPipe(
        @Body(MyPipe) myBody,
    ) {
        return myBody
    }

    @Put(':id')
    modifierTodo(
        @Param('id') id,
        @Body() newTodo : UpdateTodoDto
    ){
        this.todoService.updateTodo(id, newTodo)
    }

    @Delete(':id')
    deleteTodo(
        @Param('id') id
    ) {
        return this.todoService.deleteTodo(id);
    }
}
