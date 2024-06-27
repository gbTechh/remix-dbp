import { TypedResponse, redirect } from "@remix-run/node";
import { verifyAuth } from "~/features/auth";
import {
  CategoryResponse,
  CategoryServices,
  PrismaCategoryRepository,
} from "~/features/category";
import { ROUTES } from "~/utils";

type Response = {
  categories: CategoryResponse[];
};

export const addProductPage = async (
  request: Request
): Promise<Response | TypedResponse<never>> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.CATEGORY);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  
  const category = new CategoryServices(new PrismaCategoryRepository());
  const categories = await category.getCategories();
  return { categories };
};
