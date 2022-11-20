/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param,
    ParseIntPipe, Patch, Post, Put, Query,
    DefaultValuePipe} from '@nestjs/common';
import { TodoDBService } from './todoDB.service';
import { AddTodoDto } from './DTO/add-todo.dto';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { TodoEntity } from './entities/Todo.entity';
import { filterTodoDto } from './DTO/filter-todo.dto';
import { Pagination } from 'nestjs-typeorm-paginate';



@Controller('todoDB')
export class tododbcontroller {

    constructor(private todoDBService: TodoDBService) {
    }

    @Post()
    async addTodo(
        @Body() newTodo : AddTodoDto
    ) : Promise<TodoEntity> {
        return await this.todoDBService.addTodoDB(newTodo);
    }

    @Get('paginate')
    async index(
      @Query('page', new DefaultValuePipe (1), ParseIntPipe) page = 1,
      @Query('limit', new DefaultValuePipe (10), ParseIntPipe) limit = 10,
    ): Promise<Pagination<TodoEntity>> {
      limit = limit > 100 ? 100 : limit;
      return this.todoDBService.paginate({
        page,
        limit
      });
    }

    @Get()
    async getTodos() : Promise<TodoEntity[]>{
        return await this.todoDBService.gettodoDB();
    }
    
    @Get('filterOR')
    async gettodoDBparamOR(
        @Query() mesQueryParams : filterTodoDto
    ) : Promise<TodoEntity[]>{
        return await this.todoDBService.gettodoDBparamOR(mesQueryParams);
    }

    @Get('filterAND')
    async gettodoDBparamAND(
        @Query() mesQueryParams : filterTodoDto
    ) : Promise<TodoEntity[]>{
        return await this.todoDBService.gettodoDBparamAND(mesQueryParams);
    }

    @Get('groupByStatus')
    async groupByStatus() {
        return await this.todoDBService.groupByStatus();
    }

    @Patch(':id')
    modifierTodo(
        @Param('id', ParseIntPipe) id : number,
        @Body() newTodo : UpdateTodoDto
    ){
        this.todoDBService.updateTodo(id, newTodo)
    }

    @Get(':id')
    async getTodoById(
        @Param('id', ParseIntPipe) id : number
    ) : Promise<TodoEntity>{
        return await this.todoDBService.findById(id);
    }

    @Delete(':id')
    async supprimerTodo(
        @Param('id', ParseIntPipe) id : number
    ) {
        return this.todoDBService.softDeleteTodo(id);
    }

    @Get('restore/:id')
    async restaurerTodo(
        @Param ('id', ParseIntPipe) id : number
    ) {
        return await this.todoDBService.restoreTodo(id);
    }

    

}
