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
import { PATH_CATEGORIES, deleteExistingImage, handleResponse, prismaErrors } from "~/features/common";
import { ICategoryFormOrUpdate } from "~/interfaces";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



export const actionEditCategory = async (
  request: Request,
  categoryId: number
) => {

  if (
    typeof Number(categoryId) !== "number" ||
    isNaN(Number(categoryId)) ||
    Number(categoryId) <= 0
  ) {
    return redirect(ROUTES.CATEGORY);
  }

 
  const requestClone = request.clone();
  const requestData = await requestClone.formData();
  const image = requestData.get("image");
  const category = new CategoryServices(new PrismaCategoryRepository());

  let data: ICategoryFormOrUpdate = {}
  if (image && typeof image === "object" && "size" in image) {
    const file = image as File;
    console.log({file})
    if (file.size === 0) {      
      data = {
        name: requestData.get("name") as string,
        slug: requestData.get("slug") as string,
      };
    } else {  
      const categoryById = await category.getCategoryById(categoryId);   
      if (categoryById?.nameImage) {
        await deleteExistingImage(categoryById.nameImage, PATH_CATEGORIES);
      }
      const formData = await handleFile(request);
      data = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        image: formData.get("image") as string,
      };
    }
  } else {
     data = {
       name: requestData.get("name") as string,
       slug: requestData.get("slug") as string,
     };
  }
 
  return editCategoryActionResponse(data, categoryId)
};


const handleFile = async (request: Request) => {
  const uploadHandler = composeUploadHandlers(
    createFileUploadHandler({
      directory: PATH_CATEGORIES,
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
