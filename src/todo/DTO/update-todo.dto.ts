/* eslint-disable prettier/prettier */

import { TodoStatusEnum } from "../entities/todoModel.entities";

/* eslint-disable prettier/prettier */
export class  UpdateTodoDto {
    name?: string;
    description?: string;
    status?: TodoStatusEnum;
}