import { Prisma } from "@prisma/client";

import { PrismaSingleton } from "~/db";
import { CategoryRepository } from "./categoryRepository";
import { ICategory, ICategoryCreate, ICategoryFormOrUpdate, TError } from "~/interfaces";

const prisma = PrismaSingleton.getInstance();

export class PrismaCategoryRepository implements CategoryRepository {
  async getAllCategories(): Promise<ICategory[] | []> {
    const data = await prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });

    // return data.map(e => {
    //   return {
    //     ...e,
    //     productos: e.products.map(producto => {
    //       return {
    //         ...producto,
    //         imagenSecundarias: JSON.parse(
    //           producto.secondaryImages as any
    //         ) as string[],
    //       };
    //     })
    //   }
    // }) || []

    return data;
  }

  async getCategoryById(categoryId: number): Promise<ICategory | null> {
    const data = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return data;
  }
  async getCategoryBySlug(categorySlug: string): Promise<ICategory | null> {
    const data = await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });
    return data;
  }

  async createCategory(data: ICategoryCreate): Promise<{
    error: TError<ICategoryFormOrUpdate> | null;
    category: ICategory | null;
  }> {
    try {
      const category = await prisma.category.create({ data });
      if (category) {
        return { error: null, category };
      } else {
        return { error: null, category: null };
      }
    } catch (error: unknown) {
      const obj: TError<ICategoryFormOrUpdate> = {
        message: "",
        hasError: true,
        state: "idle",
        body: undefined,
      };
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        obj.message = "Error al crear una categoría";
        const bodyError: { [key: string]: string } = {};
        if (error.code === "P2002") {
          const field = (error?.meta?.target as string)?.split("_")[1];
          bodyError[field] = `Ya existe un ${field} con este valor`;
          obj.body = { ...bodyError };
        }
      } else {
        if (error && typeof error === "object" && "message" in error) {
          obj.message = error.message;
        }
      }
      return { error: obj, category: null };
    } finally {
      prisma.$disconnect();
    }
  }

  async updateCategoryByIdOrSlug(
    id: number,
    where: Prisma.CategoryWhereUniqueInput,
    data: ICategoryFormOrUpdate
  ): Promise<{
    error: TError<ICategoryFormOrUpdate> | null;
    category: ICategory | null;
  }> {
    try {
      const existCategory = await this.getCategoryById(id);
      if (!existCategory) {
        return {
          error: {
            hasError: true,
            message: "No existe una categoría con ese id",
          },
          category: null,
        };
      }
      const category = await prisma.category.update({
        where: {
          ...where,
        },
        data: {
          ...data,
        },
      });
      if (category) {        
        return { error: null, category };
      } else {
        return { error: null, category: null };
      }
    } catch (error: unknown) {
      const obj: TError<ICategoryFormOrUpdate> = {
        message: "",
        hasError: true,
        state: "idle",
        body: undefined,
      };
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        obj.message = "Error al crear una categoría";
        const bodyError: { [key: string]: string } = {};
        if (error.code === "P2002") {
          const field = (error?.meta?.target as string)?.split("_")[1];
          bodyError[field] = `Ya existe un ${field} con este valor`;
          obj.body = { ...bodyError };
        }
      } else {
        if (error && typeof error === "object" && "message" in error) {
          obj.message = error.message;
        }
      }
      return { error: obj, category: null };
    } finally {
      prisma.$disconnect();
    }
  }

  async deleteCategory(categoryId: number): Promise<boolean> {
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return !!category;
  }
}
