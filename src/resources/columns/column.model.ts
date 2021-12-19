import { v4 as uuidv4 } from "uuid";
import { IColumn } from "../../common/interfaces";

/**
 * Column class
 * @class
 *
 * Constructor of class Column.
 * @constructor
 * @typedef {{id:string, title:string, order:number}}
 * @param {object.<string, column>} object
 */

module.exports = class Column implements IColumn {
  id?: string;
  title: string;
  order: number;

  constructor({ id = uuidv4(), title = "Backlog", order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
};
