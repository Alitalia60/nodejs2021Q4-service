import { v4 as uuidv4 } from "uuid";
import { ITask } from "../../common/interfaces";

/**
 *
 */

export class Task implements ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  constructor({
    id = uuidv4(),
    title = "Autotest task",
    order = 1,
    description = "",
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    if (id) {
      this.id = id;
    }
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
