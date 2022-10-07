import { Module } from '@nestjs/common';
import { TodoModuleController } from './todo.controller';

@Module({
  controllers: [TodoModuleController],
})
export class TodoModuleModule {}
