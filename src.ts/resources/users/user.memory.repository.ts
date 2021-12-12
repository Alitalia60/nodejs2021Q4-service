import { IUser } from '../../common/interfaces';
import { getUserObject } from './user.service';

export const dbUsers: IUser[] = [];

export function updateUser(user: IUser, ctxBody: string): void {
  let passedUser: IUser = JSON.parse(ctxBody);
  user.name = passedUser.name;
  user.login = passedUser.login;
  if (passedUser.password) {
    user.name = passedUser.password;
  }
}
