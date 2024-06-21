import { LoaderFunctionArgs } from "@remix-run/node"
import { Text } from "~/components";

export const loader = async({request}: LoaderFunctionArgs) => {
  return null;
}

export default function DashboardAdmin() {
  return (
    <Text>Dashboard</Text>
  )
}