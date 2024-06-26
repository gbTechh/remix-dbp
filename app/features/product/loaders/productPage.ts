import { TypedResponse } from "@remix-run/node";
import { CategoryResponse, CategoryServices, PrismaCategoryRepository } from "~/features/category";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";
import { ProductResponse } from "../ProductResponse";


type Response = {
  categories: CategoryResponse[];
  products: ProductResponse[];
};

export const productPage = async (
  request: Request
): Promise<Response | TypedResponse<never>> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.CATEGORY);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const category = new CategoryServices(new PrismaCategoryRepository());
  const product = new ProductServices(new PrismaProductRepository())
  const categories = await category.getCategories();
  const products = await product.getProducts();
  return { categories, products };
};
