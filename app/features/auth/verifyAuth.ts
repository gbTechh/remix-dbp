import { IAuthStaff, IRole } from "~/interfaces";
import { authenticator } from "./auth.service";


export const verifyAuth = async (request: Request) => {
  const user = (await authenticator.isAuthenticated(request)) as IAuthStaff;
  if (user?.id) {
    return true;
  }

  return false;
};
