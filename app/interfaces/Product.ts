import { ICategory } from "./Category";
import { IExtra } from "./Extra";
import { IOrderDetail } from "./OrderDetail";
import { IProductFeature } from "./ProductFeature";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice: number;
  rating: number | null;
  mainImage: string;
  secondaryImages: string[] | []; // Assuming secondaryImages is an array of strings (URLs)
  categoryId: number;
  category?: ICategory;
  extras?: IExtra[];
  orderDetails?: IOrderDetail[];
  features?: IProductFeature[];
}