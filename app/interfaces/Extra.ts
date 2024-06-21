import { IProduct } from "./Product";

export interface IExtra {
  id: number;
  name: string;
  price: number;
  quantity: number;
  productId: number;
  product: IProduct;
}
