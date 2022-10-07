/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PremierController } from './premier.controller';


@Module({
  imports: [],
  exports: [],
  controllers: [PremierController],
  providers: []
})
export class premierModule {}
