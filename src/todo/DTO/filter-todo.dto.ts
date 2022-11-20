/* eslint-disable prettier/prettier */

import { IsIn, IsOptional } from "class-validator";
import { TodoStatusEnum } from "../models/todoStatus.enum";

export class filterTodoDto {
    @IsOptional()
    chaine: string;

    @IsOptional()
    @IsIn(["En cours","En attente","Finalisé"])
    status: TodoStatusEnum;
    
}