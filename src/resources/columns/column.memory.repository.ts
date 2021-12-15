import { IBoard, IColumn } from '../../common/interfaces';
import { findBoardAsObjectById } from '../boards/board.memory.repository';
export let dbColumns: IColumn[] = [];

//deleting all columns if exist on board id
export function deleteColumnsOfBoardId(boardId: string): void {
  let board: IBoard | undefined = findBoardAsObjectById(boardId);
  if (board) {
    board.columns = board.columns.filter((item) => item.id != boardId);
    dbColumns = dbColumns.filter((item) => item.id != boardId);
  }
}
