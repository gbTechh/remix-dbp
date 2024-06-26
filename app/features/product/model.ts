import { Prisma } from "@prisma/client";

import { PrismaSingleton } from "~/db";
import { IProduct, IProductCreate, IProductFormOrUpdate, TError } from "~/interfaces";
import { ProductRepository } from "./productRepository";

const prisma = PrismaSingleton.getInstance();

export class PrismaProductRepository implements ProductRepository {
  async getAllProducts(): Promise<IProduct[] | []> {
    const data = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return (
      data.map((e) => {
        return {
          ...e,
          secondaryImages: e.secondaryImages
            ? (JSON.parse(e.secondaryImages as string) as string[])
            : [],
        };
      }) || []
    );
  }

  async getProductById(productId: number): Promise<IProduct | null> {
    const data = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
      },
    });

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      discountPrice: data.discountPrice,
      rating: data.rating,
      mainImage: data.mainImage,
      secondaryImages: data.secondaryImages
        ? (JSON.parse(data.secondaryImages as string) as string[])
        : [],
      categoryId: data.categoryId,
      category: data.category || undefined,
    };
  }
  async getProductBySlug(productSlug: string): Promise<IProduct | null> {
    const data = await prisma.product.findUnique({
      where: {
        slug: productSlug,
      },
      include: {
        category: true,
      },
    });

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      price: data.price,
      discountPrice: data.discountPrice,
      rating: data.rating,
      mainImage: data.mainImage,
      secondaryImages: data.secondaryImages
        ? (JSON.parse(data.secondaryImages as string) as string[])
        : [],
      categoryId: data.categoryId,
      category: data.category || undefined,
    };
  }

  async createProduct(data: IProductCreate): Promise<{
    error: TError<IProductFormOrUpdate> | null;
    product: IProduct | null;
  }> {
    try {
      const product = await prisma.product.create({ data });
      const formattedProduct: IProduct = {
        ...product,
        secondaryImages: product.secondaryImages
          ? (JSON.parse(product.secondaryImages as string) as string[])
          : [],
      };

      return { error: null, product: formattedProduct };
    } catch (error: unknown) {
      const obj: TError<IProductFormOrUpdate> = {
        message: "",
        hasError: true,
        state: "idle",
        body: undefined,
      };
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        obj.message = "Error al crear un producto";
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
      return { error: obj, product: null };
    } finally {
      prisma.$disconnect();
    }
  }

  async updateProductByIdOrSlug(
    id: number,
    where: Prisma.ProductWhereUniqueInput,
    data: IProductFormOrUpdate
  ): Promise<{
    error: TError<IProductFormOrUpdate> | null;
    product: IProduct | null;
  }> {
    try {
      const existsProduct = await this.getProductById(id);
      if (!existsProduct) {
        return {
          error: {
            hasError: true,
            message: "No existe una categoría con ese id",
          },
          product: null,
        };
      }
      const product = await prisma.product.update({
        where: {
          ...where,
        },
        data: {
          ...data,
        },
      });
      if (product) {
        const formattedProduct: IProduct = {
          ...product,
          secondaryImages: product.secondaryImages
            ? (JSON.parse(product.secondaryImages as string) as string[])
            : [],
        };

        return { error: null, product: formattedProduct };
      } else {
        return { error: null, product: null };
      }
    } catch (error: unknown) {
      const obj: TError<IProductFormOrUpdate> = {
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
      return { error: obj, product: null };
    } finally {
      prisma.$disconnect();
    }
  }

  async deleteProduct(productId: number): Promise<boolean> {
    const category = await prisma.category.delete({
      where: {
        id: productId,
      },
    });
    return !!category;
  }
}
