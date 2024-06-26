import { IRole } from "./Role";

// salida de base de datos para listing
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IRole;
}

//entrada datos para base de datos al crear
export interface IUserCreate {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: IRole;
}

//entrada datos para base de datos al actualizar
export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: IRole;
}

//entrada de datos desde el formulario
export interface MyFormDataUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IRole;
}

// validaciones del formulario
export interface MyFormValidateErrorsUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: IRole;
}
