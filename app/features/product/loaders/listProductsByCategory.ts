import { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import { ProductResponse } from "../ProductResponse";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";
import { CategoryResponse, CategoryServices, PrismaCategoryRepository } from "~/features/category";

type Response =
  | {
      products: ProductResponse[];
      categories: CategoryResponse[];
    }
  | TypedResponse<never>;

export const listProductsbyCategory = async ({
  request,
  params,
}: LoaderFunctionArgs): Promise<Response> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.Product);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const { slug } = params;
  
  const category = new CategoryServices(new PrismaCategoryRepository());
  const categories = await category.getCategories();
  const product = new ProductServices(
    new PrismaProductRepository(),
    new PrismaCategoryRepository()
  );
  const products = await product.getProductsByCategory(slug!);
  return { products, categories };
};
