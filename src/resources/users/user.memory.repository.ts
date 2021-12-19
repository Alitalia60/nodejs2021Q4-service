import { IUser } from "../../common/interfaces";

/**
 * return as arrray all items of memory repository dbUsers
 */
export const dbUsers: IUser[] = [];

/**
 * return finded user as Object
 *
 * @param userId - passed id of user
 * @returns
 */
export function findUserAsObject(userId: string): IUser | undefined {
  return dbUsers.find((item) => {
    item.id === userId;
  });
}

/**
 * update data of object user
 *
 * @param userId - passed user id
 * @param ctxBody - passed koa request body, containing user data
 */
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
