import { IBoard, IColumn } from "../../common/interfaces";
import { findBoardAsObjectById } from "../boards/board.memory.repository";
export let dbColumns: IColumn[] = [];

//deleting
/**
 *delete all columns if exist on board.id == boardId
 *
 * @param columnId
 */
export function  deleteColumnsOfBoardId(boardId: string) {
  let board: IBoard | undefined = findBoardAsObjectById(boardId);
  dbColumns = dbColumns.filter((item) => item.id != boardId);
  if (board) {
    board.columns = board.columns.filter((item) => item.id != boardId);
  }
}
