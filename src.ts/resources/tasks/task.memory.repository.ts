import { ITask } from '../../common/interfaces';

export const dbTasks: ITask[] = [];

export function updateTask(task: ITask, ctxBody: string): void {
  let passedTask: ITask = JSON.parse(ctxBody);
  task.title = passedTask.title;
  task.order = passedTask.order;
  task.description = passedTask.description;
  task.userId = passedTask.userId;
  task.boardId = passedTask.boardId;
  task.columnId = passedTask.columnId;
}
