import { LoaderFunctionArgs, TypedResponse, redirect } from "@remix-run/node";
import { CategoryResponse } from "../CategoryResponse";
import { PrismaCategoryRepository } from "../model";
import { CategoryServices } from "../Category.services";
import { ROUTES } from "~/utils";

export const listCategoryById = async (
  {
    request,
    params
  }: LoaderFunctionArgs
): Promise<CategoryResponse | TypedResponse<never>> => {
  // const hasPermission = await verifyRolAndAuth(request, MODULES_CODE.CATEGORY);
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const { id } = params;

  if (typeof Number(id) !== "number" || isNaN(Number(id)) || Number(id) <= 0) {
    return redirect(ROUTES.CATEGORY);
  }

  
  const category = new CategoryServices(new PrismaCategoryRepository());
  const categoryById = await category.getCategoryById(Number(id));

  if(!categoryById){
    return redirect(ROUTES.CATEGORY);
  }
  return categoryById;
};
