/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { premierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [premierModule, TodoModuleModule, CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testnest',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
