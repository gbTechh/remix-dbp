import { IAuthStaff } from "~/interfaces";

export interface AuthRepository {
  authStaff(email: string): Promise<IAuthStaff | null>;

  // updateCustomerByIdOrSlug(
  //   id: number,
  //   where: Prisma.CustomerWhereUniqueInput,
  //   data: IStaffUpdate,

  // ): Promise<{
  //   error: TError<MyFormValidateErrorsCustomer> | null;
  //   customer: IStaff | null;
  // }>;
  // deleteCustomer(customerId: number): Promise<boolean>;
}
