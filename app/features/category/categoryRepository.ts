import { Prisma } from "@prisma/client";
import { ICategory, ICategoryCreate, ICategoryFormOrUpdate, TError } from "~/interfaces";



export interface CategoryRepository {
  getAllCategories(): Promise<ICategory[] | []>;
  getCategoryById(categoryId: number): Promise<ICategory | null>;
  getCategoryBySlug(categorySlug: string): Promise<ICategory | null>;
  createCategory(data: ICategoryCreate): Promise<{
    error: TError<ICategoryFormOrUpdate> | null;
    category: ICategory | null;
  }>;
  updateCategoryByIdOrSlug(
    id: number,
    where: Prisma.CategoryWhereUniqueInput,
    data: ICategoryFormOrUpdate
  ): Promise<{
    error: TError<ICategoryFormOrUpdate> | null;
    category: ICategory | null;
  }>;
  
  deleteCategory(categoryId: number): Promise<boolean>;
}
