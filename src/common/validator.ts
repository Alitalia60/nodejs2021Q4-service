import { Board } from "../resources/boards/board.model";
import { User } from "../resources/users/user.model";
import { Task } from "../resources/tasks/task.model";
import { IBoard, ITask, IUser } from "./interfaces";
import { koaContext } from "./types";
import { logger } from "./logger";

/**
 * validate structure passed in body tuo use in classInstance
 * 
 * @param bodyJson - request body
 * @param ClassInstane - instance of Class
 * @returns boolean
 */
export function validateBody(ctx: koaContext, classInstance: User | Board | Task): boolean {
    let bodyJson: IUser | IBoard | ITask = ctx.request.body;

    let className = ''
    if (classInstance instanceof User) {
        className = 'User'
    } else if ((classInstance instanceof Board)) {
        className = 'User'
    } else if ((classInstance instanceof Task)) {
        className = 'User'
    }
    let result = true;
    for (let key in bodyJson) {
        if (!classInstance.hasOwnProperty(key)) {
            logger(`passed bad property '${key}' of ${className}`, 'warn');
            result = false
        }
    }
    return result
}