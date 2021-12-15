import { v4 as uuidv4 } from 'uuid';
import { IBoard, IColumn } from '../../common/interfaces';

export class Board implements IBoard {
  id?: string | undefined;
  title: string;
  columns: IColumn[];

  constructor({
    title = 'Autotest board',
    columns = [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 },
    ],
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}
