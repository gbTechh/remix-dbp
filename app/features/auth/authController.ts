import bcrypt from "bcryptjs";
import { mappedResponseAuthStaffData } from "./mapper";
import { PrismaAuthRepository } from "./model";

export const authStaff = async (email: string, password: string) => {
  const authRepository = new PrismaAuthRepository();
  const user = await authRepository.authStaff(email);

  if (!user) {
    return "Usuario no encontrado";
  }

  const passwardCompared = await bcrypt.compare(password, user.password);

  if (!passwardCompared) {
    return "Error de credenciales";
  }

  const response = mappedResponseAuthStaffData(user);

  return response;
};
