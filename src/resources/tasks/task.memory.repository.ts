import { ITask } from '../../common/interfaces';

export let dbTasks: ITask[] = [];

export function updateTask(taskId: string, ctxBody: ITask): void {
  let task = dbTasks.filter((task) => task.id === taskId)[0];
  if (task) {
    task.title = ctxBody.title;
    task.order = ctxBody.order;
    task.description = ctxBody.description;
    task.userId = ctxBody.userId;
    task.boardId = ctxBody.boardId;
    task.columnId = ctxBody.columnId;
  }
}

//delete all tasks if exist on board.id == boardId
export function deleteTasksOfBoardId(boardId: string): void {
  dbTasks = dbTasks.filter((item) => item.boardId != boardId);
}

//delete all tasks if exist on column.id == columnId
export function deleteTasksOfColumnId(columnId: string): void {
  dbTasks = dbTasks.filter((item) => item.boardId != columnId);
}

//assign task.userId = null if delete user.id == userId
export function unassignUserIdFromTask(userId: string): void {
  dbTasks.forEach((element) => {
    if (element.userId === userId) {
      element.userId = null;
    }
  });
}
