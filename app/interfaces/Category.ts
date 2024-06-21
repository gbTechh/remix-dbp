import { IProduct } from "./Product";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image?: string;
  products?: IProduct[];
}
export interface ICategoryCreate {
  name: string;
  image?: string;
  slug: string;
}

export interface ICategoryFormOrUpdate {
  name?: string;
  slug?: string;
  image?: string;
}

export interface ICategoryResponse {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}