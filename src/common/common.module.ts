/* eslint-disable prettier/prettier */

import { Global, Module } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid'
import { CrudService } from './services/crud.service';

const V4UUID = {
    provide: 'UUID',
    useValue: uuidv4
}

@Global()
@Module({
    providers: [V4UUID,CrudService],
    exports: [V4UUID,CrudService]
})
export class CommonModule {}
