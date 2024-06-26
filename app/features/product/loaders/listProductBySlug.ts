import { LoaderFunctionArgs, TypedResponse } from "@remix-run/node";
import { ProductResponse } from "../ProductResponse";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";
import { CategoryResponse, CategoryServices, PrismaCategoryRepository } from "~/features/category";

type Response =
  | {
      product: ProductResponse | null;
    }
  | TypedResponse<never>;

export const listProductbySlug = async ({
  request,
  params,
}: LoaderFunctionArgs): Promise<Response> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.Product);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const { slug } = params;
  
  const product = new ProductServices(
    new PrismaProductRepository()
  );
  const productObj = await product.getProductBySlug(slug!);
  return { product: productObj };
};
