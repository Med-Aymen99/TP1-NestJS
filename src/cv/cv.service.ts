import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { CrudService } from '../common/services/crud.service';

@Injectable()
export class CvService extends CrudService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }
}
