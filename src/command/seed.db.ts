import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import {
  randSkill,
  randUserName,
  randEmail,
  randPassword,
  randNumber,
  randJobTitle,
  randFirstName,
  randLastName,
  randFilePath,
} from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Cv } from '../cv/entities/cv.entity';
import { CvService } from '../cv/cv.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const skillService = app.get(SkillService);
  const userService = app.get(UserService);
  const cvService = app.get(CvService);

  for (let i = 0; i < 50; i++) {
    const skill = new Skill();
    skill.designation = randSkill();
    await skillService.create(skill);

    const user = new User();
    user.username = randUserName();
    user.email = randEmail();
    user.password = randPassword();
    await userService.create(user);
  }
  for (let i = 0; i < 50; i++) {
    const cv = new Cv();
    cv.age = randNumber();
    cv.cin = String(randNumber());
    cv.job = randJobTitle();
    cv.firstname = randFirstName();
    cv.path = randFilePath();
    cv.name = randLastName();
    const randId = Math.floor(Math.random() * 48) + 1;
    const user = await userService.findOne(randId);
    cv.user = user;
    const skills = [];
    for (let j = 0; j < 3; j++) {
      const randId = Math.floor(Math.random() * 48) + 1;
      const skill = await skillService.findOne(randId);
      if (!skills.includes(skill)) {
        skills.push(skill);
      }
    }
    cv.skills = skills;
    cvService.create(cv);
  }
  await app.close();
}

bootstrap();
