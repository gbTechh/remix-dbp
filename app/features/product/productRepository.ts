import { Prisma } from "@prisma/client";
import { IProduct, IProductCreate, IProductFormOrUpdate, TError } from "~/interfaces";



export interface ProductRepository {
  getAllProducts(): Promise<IProduct[] | []>;
  getProductById(roductId: number): Promise<IProduct | null>;
  getProductBySlug(roductSlug: string): Promise<IProduct | null>;
  createProduct(data: IProductCreate): Promise<{
    error: TError<IProductFormOrUpdate> | null;
    product: IProduct | null;
  }>;
  updateProductByIdOrSlug(
    id: number,
    where: Prisma.ProductWhereUniqueInput,
    data: IProductFormOrUpdate
  ): Promise<{
    error: TError<IProductFormOrUpdate> | null;
    product: IProduct | null;
  }>;

  deleteProduct(productId: number): Promise<boolean>;
}
