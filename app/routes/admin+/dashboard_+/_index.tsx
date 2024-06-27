import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { Text } from "~/components";
import { verifyAuth } from "~/features";
import { ROUTES } from "~/utils";

export const loader = async({request}: LoaderFunctionArgs) => {
  const isAuth = await verifyAuth(request); 
  if (!isAuth) return redirect(ROUTES.ADMIN_LOGIN);
  return null;
}

export default function DashboardAdmin() {
  return (
    <Text>Dashboard</Text>
  )
}