import { Prisma, PrismaClient, Role as PrismaRole } from "@prisma/client";
import { PrismaSingleton } from "~/db";
import {
  IRole,
  IUser,
  IUserCreate,
  MyFormValidateErrorsUser,
  TError,
} from "~/interfaces";
import { UserRepository } from "./userRepository";

const prisma = PrismaSingleton.getInstance();

export class PrismaUserRepository implements UserRepository {
  async createUser(
    data: IUserCreate,
    password: string
  ): Promise<{
    error: TError<MyFormValidateErrorsUser> | null;
    user: IUser | null;
  }> {
    try {
      const user = await prisma.user.create({
        data: {
          ...data,
          password: password,
          role: data.role as PrismaRole,
        },
      });
      if (user) {
        const userResponse: IUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          role: user.role as IRole, // Type assertion if necessary
        };
        return { error: null, user: userResponse };
      } else {
        return { error: null, user: null };
      }
    } catch (error: unknown) {
      console.log(error);
      const obj: TError<MyFormValidateErrorsUser> = {
        message: "",
        hasError: true,
        state: "idle",
        body: undefined,
      };
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        obj.message = "Error al crear un producto";
        const bodyError: { [key: string]: string } = {};
        if (error.code === "P2002") {
          const field = (error?.meta?.target as string)?.split("_")[1];
          bodyError[field] = `Ya existe un ${field} con este valor`;
          obj.body = { ...bodyError };
        }
      } else {
        if (error && typeof error === "object" && "message" in error) {
          obj.message = error.message;
        }
      }
      return { error: obj, user: null };
    } finally {
      prisma.$disconnect();
    }
  }
}
