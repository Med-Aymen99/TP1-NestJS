/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
export enum TodoStatusEnum {
    'actif' = "En cours",
    'waiting' = "En attente",
    'done' = "Finalisé"
}

export class TodoModel {


    constructor(public name: string,
        public description: string,
        public status: TodoStatusEnum = TodoStatusEnum.waiting,
        public id = uuidv4().split('-')[0],
        public creationDate = new Date()
    ) {}
    
}