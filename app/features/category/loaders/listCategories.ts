import { TypedResponse } from "@remix-run/node";
import { CategoryResponse } from "../CategoryResponse";
import { PrismaCategoryRepository } from "../model";
import { CategoryServices } from "../Category.services";



export const listCategories = async (
  request: Request
): Promise<CategoryResponse[] | TypedResponse<never>> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.CATEGORY);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const category = new CategoryServices(new PrismaCategoryRepository());
  const categories = await category.getCategories();
  return categories;
};
