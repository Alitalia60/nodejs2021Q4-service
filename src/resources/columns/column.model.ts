import { v4 as uuidv4 } from 'uuid';
import { IColumn } from '../../common/interfaces';

module.exports = class Column implements IColumn {
  id?: string | undefined;
  title: string;
  order: number;

  constructor({ id = uuidv4(), title = 'Backlog', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  // updateColumn({ title, order }) {
  //   this.title = title;
  //   this.order = order;
  // }
  // static toResponse(column) {
  //   const { id, title, columns } = column;
  //   return { id, title, columns };
  // }
};
