import { ICategoryFormOrUpdate } from "~/interfaces";
import { CategoryServices } from "../Category.services";
import { PrismaCategoryRepository } from "../model";
import { FormDataRequest, PATH_CATEGORIES, handleResponse } from "~/features/common";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";



export const actionAddCategory = async (request: Request) => {

  const formData = await handleFile(request);

  // const data = await FormDataRequest<ICategoryFormOrUpdate>(request, ["name","slug"]);
  const data: ICategoryFormOrUpdate = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    image: formData.get("image") as string,
  };

  const categoryResponse = await AddCategoryResponse(data);
  return categoryResponse;
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
    formData.set("image", ''); // Set an empty string if image is not present
  } else {
    formData.set("image", (image as any).name);
  }

  return formData;
}

export const AddCategoryResponse = async (
  data: ICategoryFormOrUpdate
) => {
  
  const category = new CategoryServices(new PrismaCategoryRepository());
  const categoryCreated = await category.createCategory(data);

  if (categoryCreated.data === null) {
    return handleResponse(
      {
        message: "Ups! verifica los errores",
        hasError: true,
        state: "finished",
        body: categoryCreated,
      },
      400
    );
  } else {
    return handleResponse(
      {
        message: "Categoria agregada con éxito",
        hasError: false,
        state: "finished",
        body: categoryCreated,
      },
      200
    );
  }
};
