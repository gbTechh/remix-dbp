import { PrismaSingleton } from "~/db";
import { AuthRepository } from "./authRepository";
import { IAuthStaff } from "~/interfaces";

const prisma = PrismaSingleton.getInstance();

export class PrismaAuthRepository implements AuthRepository {
  async authStaff(email: string): Promise<IAuthStaff | null> {
    const staff = await prisma.user.findUnique({
      where: {
        email,
      },
      
    });
    if (staff) {
      return staff;
    } else {
      return null;
    }
  }
}
