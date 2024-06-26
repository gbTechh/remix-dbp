import { ROUTES } from "~/utils";
import { authenticator } from "./auth.service";

export const actionLoginAdmin = async (request: Request) => {
  return await authenticator.authenticate("form", request, {
    successRedirect: ROUTES.DASHBOARD,
    failureRedirect: ROUTES.ADMIN_LOGIN,
  });
};
