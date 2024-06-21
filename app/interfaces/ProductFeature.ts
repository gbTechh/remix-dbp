import { IFeature } from "./Feature";
import { IProduct } from "./Product";

export interface IProductFeature {
  id: number;
  productId: number;
  product: IProduct;
  featureId: number;
  feature: IFeature;
}
