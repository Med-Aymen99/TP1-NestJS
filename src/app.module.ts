import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest3',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
