/* eslint-disable prettier/prettier */

import { PartialType } from "@nestjs/mapped-types";
import { MinLength, MaxLength, IsIn, IsOptional} from 'class-validator';
import { TodoStatusEnum } from "../models/todoStatus.enum";
import { AddTodoDto } from "./add-todo.dto";

/* eslint-disable prettier/prettier */
export class  UpdateTodoDto extends PartialType(AddTodoDto){

    @MinLength(3,{
        message: 'La taille minimale du champ name est de 3 caractères'
    })
    @MaxLength(10,{
        message: 'La taille maximale du champ name est de 10 caractères'
    })
    name: string;

    @MinLength(10,{
        message: 'La taille minimale du champ description est de 10 caractères'
    })
    description: string;
    
    @IsOptional()
    @IsIn(["En cours","En attente","Finalisé"])
    status: TodoStatusEnum;
}