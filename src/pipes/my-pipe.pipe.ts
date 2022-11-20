/* eslint-disable prettier/prettier */

import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class MyPipe implements PipeTransform {
  transform(value: {data: string[]}, metadata: ArgumentMetadata) {
    if (!value.data) 
      throw new BadRequestException()
    if (metadata.type === 'body') {
      return value.data.map(element => element.toUpperCase()).join('-');
    }
    return value;
  }
}