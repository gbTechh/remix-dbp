export type IAuthStaff = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
};

//entrada datos para base de datos al crear
export interface IAuthCreateStaff {
  password: string;
}

//entrada datos para base de datos al actualizar
export interface IAuthUpdateStaff {
  password?: string;
}

//entrada de datos desde el formulario
export interface MyFormDataAuthStaff {
  password: string | null;
  email: string | null;
}

// validaciones del formulario
export interface MyFormValidateErrorsAuthStaff {
  password?: string;
}
