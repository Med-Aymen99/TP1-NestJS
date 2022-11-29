import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { JoinTable } from 'typeorm';
@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne((type) => User, null, { eager: true })
  user: User;
  @ManyToMany((type) => Skill, null, { eager: true })
  @JoinTable({
    name: 'cv_skills',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
