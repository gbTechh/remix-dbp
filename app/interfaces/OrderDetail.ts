import { IOrder } from "./Order";
import { IProduct } from "./Product";

export interface IOrderDetail {
  id: number;
  orderId: number;
  order: IOrder;
  productId: number;
  product: IProduct;
  quantity: number;
  price: number;
  extras: any; // This can be typed more strictly depending on the structure of the JSON
}
