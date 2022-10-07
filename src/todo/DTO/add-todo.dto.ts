/* eslint-disable prettier/prettier */

import { TodoStatusEnum } from "../entities/todoModel.entities";

    // eslint-disable-next-line prettier/prettier
export class  AddTodoDto {
    name: string;
    description: string;
    status?: TodoStatusEnum;
}