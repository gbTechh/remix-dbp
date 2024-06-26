import bcrypt from "bcryptjs";
import { UserRepository } from "./userRepository";
import { IUserCreate, MyFormDataUser, MyFormValidateErrorsUser, TError } from "~/interfaces";
import { UserResponse, mappedResponseUsersData } from "./mapper";





type ReturnData<T> = {
  data: UserResponse | null;
  error: TError<T> | null;
};

//Si el admin registra al User, entonces este dbee estar inactivo pero debe ser guest falso y ser usuario registrado, el sistema le genera una contraseña y se le envia por email al usuario creado con un link para activar su cuenta que debe durar a lo mucho 24h, passadas las 24h el link debe estar invalidado, una vez que de click al link el usuario peude cambiar su contraseña, el adminsitrador podra desactivar una cuenta y tambien vovler a enviar un link para que el usuario la active de nuevo

/*
si al crear un usuario no existe el idrol, se le asigna por default un rol de tipo invitado, si no existe el rol invitado se crea
No se pueden crear usuarios root 
*/

export async function createUser(
  UserRepository: UserRepository,
  data: MyFormDataUser
): Promise<ReturnData<MyFormValidateErrorsUser>> {
  try {
  

    const dataFormatted: IUserCreate = {
      name: data.name! && data.name.trim()!,
      email: data.email! && data.email.trim()!,
      phone: data.phone!,
      role: data.role!
    };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const { error, user } = await UserRepository.createUser(
      dataFormatted,
      data.password
    );

    if (error?.hasError) {
      return { error: error, data: null };
    } else if (user !== null) {
      
       
      const userMapped = mappedResponseUsersData(user);
      return { error: null, data: userMapped };
    } else {
      const errorObj: TError<MyFormValidateErrorsUser> = {
        message: "Verifica los errores",
        hasError: true,
        body: {},
        state: "idle",
      };
      return { error: errorObj, data: null };
    }
  } catch (error: unknown) {
    console.log(error);
    return { error: error as TError<MyFormValidateErrorsUser>, data: null };
  }
}
