import { IOrder } from "./Order";
import { IRole } from "./Role";

export interface IClient {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IRole;
  orders: IOrder[];
}
