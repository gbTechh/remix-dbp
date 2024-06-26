import { IAuthStaff } from "~/domain";


export class AuthStaffResponse {
  id: number;
  active: boolean;
  email: string;
  full_name: string;
  id_customer: number;
  id_rol: number;
  password?: string;
  session: boolean;
  is_root: boolean;

  constructor({
    id,
    active,
    email,
    full_name,
    id_customer,
    id_rol,
    session,
    is_root
  }: IAuthStaff) {
    this.id = id;
    this.active = active;
    this.email = email;
    this.full_name = full_name;
    this.id_customer = id_customer;
    this.id_rol = id_rol;
    this.is_root = is_root;
    this.session = session;
  }
}