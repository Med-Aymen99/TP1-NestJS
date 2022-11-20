/* eslint-disable prettier/prettier */
import { TodoStatusEnum } from './todoStatus.enum';

export class Todo {

    constructor(
        public name: string,
        public description: string,
        public creationDate: Date ,
        public id : string,
        public status: TodoStatusEnum = TodoStatusEnum.waiting 
    ) {

    }
    
}