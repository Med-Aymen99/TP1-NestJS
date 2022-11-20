/* eslint-disable prettier/prettier */

import { Global, Module } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid'

const V4UUID = {
    provide: 'UUID',
    useValue: uuidv4
}

@Global()
@Module({
    providers: [V4UUID],
    exports: [V4UUID]
})
export class CommonModule {}
