import { LoaderFunctionArgs, TypedResponse, redirect } from "@remix-run/node";
import { ROUTES } from "~/utils";
import { verifyAuth } from "~/features/auth";
import { ProductResponse } from "../ProductResponse";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";
import { CategoryResponse, CategoryServices, PrismaCategoryRepository } from "~/features/category";

type Response = {
  productById: ProductResponse;
  categories: CategoryResponse[];
};

export const listProductById = async ({
  request,
  params,
}: LoaderFunctionArgs): Promise<Response | TypedResponse<never>> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.CATEGORY);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const { id } = params;
  if (typeof Number(id) !== "number" || isNaN(Number(id)) || Number(id) <= 0) {
    return redirect(ROUTES.PRODUCT);
  }

  const product = new ProductServices(new PrismaProductRepository());
  const productById = await product.getProductById(Number(id));
  const category = new CategoryServices(new PrismaCategoryRepository());
  const categories = await category.getCategories();
  if (!productById) {
    return redirect(ROUTES.PRODUCT);
  }

  return { productById, categories };
};
