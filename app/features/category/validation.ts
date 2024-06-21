import { ICategoryFormOrUpdate } from "~/interfaces";
import { Validator } from "../common/Validator";


export const validateFormErrors = <T>(formData: ICategoryFormOrUpdate) => {
  let errors = {} as T;
  const name = new Validator(formData.name);
  const slug = new Validator(formData.slug);

  const errorName = name
    .isRequired({ name: "El nombre es requerido" })
    .isNameValid({ name: "Escribe un nombre adecuado" })
    .validate();
  const errorSlug = slug
    .isRequired({ slug: "El slug es requerido" })
    .isSlugValid({ slug: "Escribe un nombre adecuado" })
    .validate();
 

  errors = {
    ...errorName,
    ...errorSlug,
  } as T;

  return errors;
};

