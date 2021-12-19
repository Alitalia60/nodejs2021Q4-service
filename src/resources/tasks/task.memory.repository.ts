import { ITask } from '../../common/interfaces';

/**
 * return as arrray all items of memory repository dbTasks
 */
export let dbTasks: ITask[] = [];

/**
 * 
 * @param taskId - passed id of task 
 * @param ctxBody - passed body of koa context body, containing task data
 */
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

/**
 *delete all tasks with boardId, if exist on board.id == boardId
 * 
 * @param boardId - passed id of board 
 */
export function deleteTasksOfBoardId(boardId: string): void {
  dbTasks = dbTasks.filter((item) => item.boardId != boardId);
}

/**
 *delete all tasks with boardId, if exist on column.id == columnId
 * 
 * @param columnId 
 */
export function deleteTasksOfColumnId(columnId: string): void {
  dbTasks = dbTasks.filter((item) => item.boardId != columnId);
}

/**
 *assign task.userId = null if when deleted user if user.id == task.userId
 * 
 * @param userId - passed id of user 
 */
export function unassignUserIdFromTask(userId: string): void {
  dbTasks.forEach((element) => {
    if (element.userId === userId) {
      element.userId = null;
    }
  });
}
