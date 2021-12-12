import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../common/interfaces';

export class User implements IUser {
  id?: string;
  name: string;
  login: string;
  password?: string;

  constructor({
    id = uuidv4(),
    name = 'TEST_USER',
    login = 'test_user',
    password = 'T35t_P@55w0rd',
  } = {}) {
    this.name = name;
    this.login = login;
    if (password) {
      this.password = password;
    }
    if (id) {
      this.id = id;
    }
  }
}
