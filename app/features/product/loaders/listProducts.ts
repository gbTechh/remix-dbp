import { TypedResponse } from "@remix-run/node";
import { ProductResponse } from "../ProductResponse";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";

export const listProducts = async (
  request: Request
): Promise<ProductResponse[] | TypedResponse<never>> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.Product);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const product = new ProductServices(new PrismaProductRepository());
  const products = await product.getProducts();
  return products;
};
