import { redirect } from "@remix-run/node";
import { ROUTES } from "~/utils";

export const loader = () => {
  return redirect(ROUTES.DASHBOARD);
};
