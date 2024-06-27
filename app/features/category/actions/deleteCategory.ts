import { TypedResponse, redirect } from "@remix-run/node";
import { PATH_CATEGORIES, THandleResponse, deleteExistingImage, handleResponse, prismaErrors } from "~/features/common";
import { CategoryServices } from "../Category.services";
import { PrismaCategoryRepository } from "../model";
import { ROUTES } from "~/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const actionDeleteCategory = async (
  request: Request
) => {
  
    const form = await request.formData();
    let id: number | null = Number(form.get("id"));
    if (typeof id !== "number") {
      id = null;
    }

    if(id){
      const category = new CategoryServices(new PrismaCategoryRepository());
      const categoryById = await category.getCategoryById(id);
      if (!categoryById?.id) {
        redirect(ROUTES.CATEGORY);
      }
      if (categoryById?.nameImage) {
        await deleteExistingImage(categoryById.nameImage, PATH_CATEGORIES);
      }     
      return await deleteCategoryActionResponse(id, request);
    }else{
      redirect(ROUTES.CATEGORY);
    }

   
 
};


export const deleteCategoryActionResponse = async (
  categoryId: number | null,
  request: Request
) => {
  try {
    if (categoryId) {
      if (request.method === "DELETE") {
        const category = new CategoryServices(new PrismaCategoryRepository());
        const deletedCategory = await category.deleteCategory(categoryId);

        if (deletedCategory) {
          return handleResponse(
            {
              message: "Acción realizada con éxito!!",
              hasError: false,
              state: "finished",
              body: {
                error: {
                  hasError: false,
                  message: "Se ha eliminado la categoría",
                  body: null,
                },
                data: deletedCategory,
              },
            },
            200
          );
        } else {
          return handleResponse(
            {
              message:
                "Ups! hubo un error al eliminar la categoría, inténtalo de nuevo",
              hasError: true,
              state: "finished",
              body: {
                error: {
                  hasError: true,
                  message:
                    "Ups! hubo un error al eliminar la categoría, inténtalo de nuevo",
                  body: null,
                },
                data: null,
              },
            },
            400
          );
        }
      } else {
        return redirect(ROUTES.CATEGORY);
      }
    } else {
      return redirect(ROUTES.CATEGORY);
    }
  } catch (error: unknown) {
    const message = prismaErrors(error as PrismaClientKnownRequestError);
    return handleResponse(
      {
        message,
        hasError: true,
        state: "idle",
        body: {
          error: {
            hasError: true,
            message: message,
            body: error,
          },
          data: null,
        },
      },
      400
    );
  }
};
