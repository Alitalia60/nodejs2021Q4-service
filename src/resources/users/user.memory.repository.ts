import { IUser } from "../../common/interfaces";
// import { User } from './user.model';

export const dbUsers: IUser[] = [];

export function findUserAsObject(userId: string): IUser | undefined {
  return dbUsers.find((item) => {
    item.id === userId;
  });
}

export function updateUser(userId: string, ctxBody: IUser): void {
  let user = dbUsers.filter((user) => user.id === userId)[0];
  if (user) {
    user.name = ctxBody.name;
    user.login = ctxBody.login;
    if (ctxBody.password) {
      user.password = ctxBody.password;
    }
  }
}
