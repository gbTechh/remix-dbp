import { redirect } from "@remix-run/react";
import { ROUTES } from "~/utils";
import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";


import { PATH_CATEGORIES, PATH_PRODUCT, deleteExistingImage, handleResponse, prismaErrors } from "~/features/common";
import { ICategoryFormOrUpdate, IProductFormOrUpdate } from "~/interfaces";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductServices } from "../Product.services";
import { PrismaProductRepository } from "../model";



export const actionEditProduct = async (
  request: Request,
  productId: number
) => {

  if (
    typeof Number(productId) !== "number" ||
    isNaN(Number(productId)) ||
    Number(productId) <= 0
  ) {
    return redirect(ROUTES.PRODUCT);
  }

 
  const requestClone = request.clone();
  const requestData = await requestClone.formData();
  const image = requestData.get("image");
  const product = new ProductServices(new PrismaProductRepository());

  let data: IProductFormOrUpdate = {}
  if (image && typeof image === "object" && "size" in image) {
    const file = image as File;
    if (file.size === 0) {      
      data = {
        name: requestData.get("name") as string,
        slug: requestData.get("slug") as string,
        categoryId: Number(requestData.get("categoryId")) as number,
        description: requestData.get("description") as string,
        shortDescription: requestData.get("shortDescription") as string,
        price: Number(requestData.get("price")) as number,
        discountPrice: Number(requestData.get("discountPrice")) as number,
        rating: Number(requestData.get("rating")) as number,
      };
    } else {  
      const productById = await product.getProductById(productId);   
      if (productById?.mainImage) {
        await deleteExistingImage(productById.mainImage, PATH_PRODUCT);
      }
      const formData = await handleFile(request);
      data = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        mainImage: formData.get("mainImage") as string,
        categoryId: Number(formData.get("categoryId")) as number,
        description: formData.get("description") as string,
        shortDescription: formData.get("shortDescription") as string,
        price: Number(formData.get("price")) as number,
        discountPrice: Number(formData.get("discountPrice")) as number,
        rating: Number(formData.get("rating")) as number,
      };
    }
  } else {
    data = {
    name: requestData.get("name") as string,
    slug: requestData.get("slug") as string,
    categoryId: Number(requestData.get("categoryId")) as number,
    description: requestData.get("description") as string,
    shortDescription: requestData.get("shortDescription") as string,
    price: Number(requestData.get("price")) as number,
    discountPrice: Number(requestData.get("discountPrice")) as number,
    rating: Number(requestData.get("rating")) as number,
    };
  }
 
  return editProductActionResponse(data, productId);
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

  const image = formData.get("image");

  if (!image || typeof image === "string") {
    formData.set("image", ""); // Set an empty string if image is not present
  } else {
    formData.set("image", (image as any).name);
  }

  return formData;
};



export const editProductActionResponse = async (
  data: IProductFormOrUpdate,
  productId: number | null
) => {
  try {
    
    if (productId) {
      const product = new ProductServices(new PrismaProductRepository());
      const updatedCategory = await product.updateCategory(
        data,
        productId,
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
            message: "Producto editado con éxito",
            hasError: false,
            state: "finished",
            body: updatedCategory,
          },
          200
        );
      }
    } else {
      return redirect(ROUTES.PRODUCT);
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
