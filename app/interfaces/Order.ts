import { IClient } from "./Client";
import { IOrderDetail } from "./OrderDetail";

export interface IOrder {
  id: number;
  clientId?: number;
  client?: IClient;
  total: number;
  status: string;
  date: Date;
  deliveryLocation: string;
  details: IOrderDetail[];
}
