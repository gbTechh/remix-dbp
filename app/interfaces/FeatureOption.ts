import { IFeature } from "./Feature";

export interface IFeatureOption {
  id: number;
  featureId: number;
  feature: IFeature;
  name: string;
  price: number;
  maxQuantity?: number;
}
