/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoDBService } from './todoDB.service';
import { TodoEntity } from './entities/Todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { tododbcontroller } from './todoDB.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  exports: [],
  controllers: [TodoController, tododbcontroller],
  providers: [TodoService, TodoDBService]
})
export class TodoModuleModule {}
