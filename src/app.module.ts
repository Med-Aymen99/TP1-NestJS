import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { premierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo/todo.module';

@Module({
  imports: [premierModule, TodoModuleModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
