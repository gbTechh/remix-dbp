import { Prisma } from "@prisma/client";
import { IUser, IUserCreate, MyFormValidateErrorsUser, TError } from "~/interfaces";

export interface UserRepository {  
  createUser(data: IUserCreate, password: string): Promise<{
    error: TError<MyFormValidateErrorsUser> | null;
    user: IUser | null;
  }>;

}
