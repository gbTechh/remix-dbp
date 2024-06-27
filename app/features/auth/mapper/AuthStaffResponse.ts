import { IAuthStaff } from "~/interfaces";


export class AuthStaffResponse {
  id: number;
  email: string;
  name: string;
  role: string;
  phone: string;

  constructor({
    id,
    email,
    name,
    phone,
    role
  }: IAuthStaff) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.role = role;
  }
}