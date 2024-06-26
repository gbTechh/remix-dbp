
import { IRole, IUser } from "~/interfaces";


export class UserResponse {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  rol: IRole | null;


  constructor({
    id,
    name,
    email,
    phone,
    role,
  }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    role ? this.rol = role : this.rol = null;

  }
}