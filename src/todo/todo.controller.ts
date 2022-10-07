/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { AddTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { TodoModel } from './entities/todoModel.entities';

@Controller('todo')
export class TodoModuleController {
    private todos : TodoModel[] = [];
    
    @Get()
    getTodos() {
        return this.todos;
    }

    @Post()
    addTodo(@Body() addTodoDto:AddTodoDto): TodoModel[] {
        const todo = new TodoModel(addTodoDto.name, addTodoDto.description);
        this.todos.push(todo);
        return this.todos;
    }

    @Get('/:id')
    getTodoById(@Param("id") id: string) {
        const todo = this.todos.find((element) => element.id === id);
        if (todo) {
            return todo;
        } else {
            throw new NotFoundException('not found');
        }
    }

    @Delete('/:id')
    deleteTodoById(@Param("id") id: string) {
        const todo = this.todos.find((element) => element.id === id);
        if (todo) {
            this.todos.filter((element) => element.id !== id);
            return this.todos;
        } else {
            throw new NotFoundException('not found');
        }
    }

    @Put('/:id')
    updateTodoById(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
        const todo = this.todos.find((element) => element.id === id);
        if (todo) {
            todo.name = updateTodoDto.name ?? todo.name;
            todo.description = updateTodoDto.description ?? todo.description;
            todo.status = updateTodoDto.status ?? todo.status;
        } else {
            throw new NotFoundException('not found');
        }
    }
}