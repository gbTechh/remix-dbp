import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { verifyAuth } from "~/features";
import { ROUTES } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isAuth = await verifyAuth(request);

  if(!isAuth)return redirect(ROUTES.ADMIN_LOGIN);
  return redirect(ROUTES.DASHBOARD);
};
