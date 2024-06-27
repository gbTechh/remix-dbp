
import { FormDataRequest, PATH_PRODUCT, handleResponse } from "~/features/common";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { IProductFormOrUpdate } from "~/interfaces";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";

export const actionAddProduct = async (request: Request) => {
  // const hasPermission = await verifyRolAndAuth(
  //   request,
  //   MODULES_CODE.ADD_CATEGORY
  // );
  // if (!hasPermission) {
  //   return redirect(ROUTES.BIENVENIDA);
  // }

  const formData = await handleFile(request);

  // const data = await FormDataRequest<ICategoryFormOrUpdate>(request, ["name","slug"]);
  const data: IProductFormOrUpdate = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    mainImage: formData.get("mainImage") as string,
    categoryId: (Number(formData.get("categoryId")) as number),
    description: formData.get("description") as string,
    shortDescription: formData.get("shortDescription") as string,
    price: Number(formData.get("price")) as number,
    discountPrice: Number(formData.get("discountPrice")) as number,
    rating: Number(formData.get("rating")) as number,
  };


  const productResponse = await AddProductResponse(data);
  console.log({productResponse})
  return productResponse;
};

const handleFile = async (request: Request) => {
  const uploadHandler = composeUploadHandlers(
    createFileUploadHandler({
      directory: PATH_PRODUCT,
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

  const mainImage = formData.get("mainImage");

  if (!mainImage || typeof mainImage === "string") {
    formData.set("mainImage", ""); // Set an empty string if mainImage is not present
  } else {
    formData.set("mainImage", (mainImage as any).name);
  }

  return formData;
};

export const AddProductResponse = async (data: IProductFormOrUpdate) => {
  const product = new ProductServices(new PrismaProductRepository());
  const productCreated = await product.createProduct(data);
  console.log({ productCreated });

  if (productCreated.data === null) {
    return handleResponse(
      {
        message: "Ups! verifica los errores",
        hasError: true,
        state: "finished",
        body: productCreated,
      },
      400
    );
  } else {
    return handleResponse(
      {
        message: "Categoria agregada con éxito",
        hasError: false,
        state: "finished",
        body: productCreated,
      },
      200
    );
  }
};
