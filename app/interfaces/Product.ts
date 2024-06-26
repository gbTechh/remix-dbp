import { ICategory } from "./Category";
import { IExtra } from "./Extra";
import { IOrderDetail } from "./OrderDetail";
import { IProductFeature } from "./ProductFeature";

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice: number;
  rating: number | null;
  mainImage: string | null;
  secondaryImages: string[] | [];
  categoryId: number;
  category?: ICategory;
  extras?: IExtra[];
  orderDetails?: IOrderDetail[];
  features?: IProductFeature[];
}

export interface IProductCreate {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice: number;
  rating: number | null;
  mainImage: string;
  secondaryImages: string;
  categoryId: number;
}

export interface IProductFormOrUpdate {
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  discountPrice?: number;
  rating?: number | null;
  mainImage?: string;
  secondaryImages?: string[] | [];
  categoryId?: number;
}

export interface IProductResponse {
  id: number;
  name: string | null;
  slug: string | null;
  description: string | null;
  shortDescription: string | null;
  price: number | null;
  discountPrice: number | null;
  rating: number | null | null;
  mainImage: string | null;
  secondaryImages: string[] | [] | null;
  categoryId: number | null;
  category: ICategory | null;
}