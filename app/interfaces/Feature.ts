import { IFeatureOption } from "./FeatureOption";
import { IFeatureType } from "./FeatureType";
import { IProductFeature } from "./ProductFeature";

export interface IFeature {
  id: number;
  name: string;
  type: IFeatureType;
  options: IFeatureOption[];
  products: IProductFeature[];
}
