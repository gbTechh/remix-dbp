import { redirect } from "@remix-run/react";
import { ROUTES } from "~/utils";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { CategoryServices } from "../Category.services";
import { PrismaCategoryRepository } from "../model";
import { FormDataRequest, deleteExistingImage, handleResponse, prismaErrors } from "~/features/common";
import { ICategoryFormOrUpdate } from "~/interfaces";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const actionEditCategory = async (
  request: Request,
  categoryId: number
) => {
  // const hasPermission = await verifyRolAndAuth(
  //   request,
  //   MODULES_CODE.EDIT_CATEGORY
  // );
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  if (
    typeof Number(categoryId) !== "number" ||
    isNaN(Number(categoryId)) ||
    Number(categoryId) <= 0
  ) {
    return redirect(ROUTES.CATEGORY);
  }

  // const requestData = await request.formData();
  // const image = requestData.get("image");
  
  const category = new CategoryServices(new PrismaCategoryRepository());
  // const categoryById = await category.getCategoryById(categoryId);
  
  // if (image?.name && categoryById?.image) {
  //   await deleteExistingImage(categoryById.image);
  // }
 
  const formData = await handleFile(request);
 
 
  const data: ICategoryFormOrUpdate = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    image: formData.get("image") as string,
  };
  
  return editCategoryActionResponse(data, categoryId)
};


const handleFile = async (request: Request) => {
  const uploadHandler = composeUploadHandlers(
    createFileUploadHandler({
      directory: "public/uploads",
      maxPartSize: 2_000_000,
      file({ filename }) {
        filename = filename.replaceAll(" ", "-");
        filename = filename.replaceAll("_", "-");
        return filename;
      },
    }),
    createMemoryUploadHandler()
  );
  const formData = await parseMultipartFormData(request, uploadHandler);

  const image = formData.get("image");

  if (!image || typeof image === "string") {
    formData.set("image", ""); // Set an empty string if image is not present
  } else {
    formData.set("image", (image as any).name);
  }

  return formData;
};



export const editCategoryActionResponse = async (
  data: ICategoryFormOrUpdate,
  categoryId: number | null
) => {
  try {
    
    if (categoryId) {
       const category = new CategoryServices(new PrismaCategoryRepository());
      const updatedCategory = await category.updateCategory(
        data,
        categoryId,
      );

      if (updatedCategory.data === null) {
        return handleResponse(
          {
            message: "Ups! verifica los errores",
            hasError: true,
            state: "finished",
            body: updatedCategory,
          },
          400
        );
      } else {
        return handleResponse(
          {
            message: "Categoria editada con éxito",
            hasError: false,
            state: "finished",
            body: updatedCategory,
          },
          200
        );
      }
    } else {
      return redirect(ROUTES.CATEGORY);
    }
  } catch (error: unknown) {
    const message = prismaErrors(error as PrismaClientKnownRequestError);
    return handleResponse(
      {
        message: "Ha ocurrido un error. Lo sentimos!",
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
