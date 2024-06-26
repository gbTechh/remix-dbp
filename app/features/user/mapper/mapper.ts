import { IUser } from "~/interfaces";
import { UserResponse } from "./UserResponse";

export const mappedResponseUsersData = function toResponseModel(data: IUser) {
  return new UserResponse({ ...data });
};
