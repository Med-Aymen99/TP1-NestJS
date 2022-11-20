/* eslint-disable prettier/prettier */

import { TodoStatusEnum } from "../models/todoStatus.enum";
import { IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class  AddTodoDto {
    @IsNotEmpty()
    @MinLength(3,{
        message: 'La taille minimale du champ name est de 3 caractères'
    })
    @MaxLength(10,{
        message: 'La taille maximale du champ name est de 10 caractères'
    })
    name: string;

    @IsNotEmpty()
    @MinLength(10,{
        message: 'La taille minimale du champ description est de 10 caractères'
    })
    description: string;
    
    status: TodoStatusEnum;
}