import { IProductFormOrUpdate } from "~/interfaces";
import { Validator } from "../common/Validator";


export const validateFormErrors = <T>(formData: IProductFormOrUpdate) => {
  let errors = {} as T;
  const name = new Validator(formData.name);
  const slug = new Validator(formData.slug);
  const categoryId = new Validator(formData.categoryId);
 
  const errorName = name
    .isRequired({ name: "El nombre es requerido" })
    .isNameValid({ name: "Escribe un nombre adecuado" })
    .validate();
  const errorSlug = slug
    .isRequired({ slug: "El slug es requerido" })
    .isSlugValid({ slug: "Escribe un nombre adecuado" })
    .validate();
  const errorCategoryId = categoryId
    .isRequired({ categoryId: "La categoría es requerida" })
    .isMinValue(1, {
      categoryId: "La categoría es requerida",
    })
    .validate();
 

  errors = {
    ...errorName,
    ...errorSlug,
    ...errorCategoryId,
  } as T;

  return errors;
};

