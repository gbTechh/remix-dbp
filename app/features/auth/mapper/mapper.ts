import { AuthStaffResponse } from ".";
import { IAuthStaff } from "~/domain";

export const mappedResponseAuthStaffData = function toResponseModel(data: IAuthStaff) {
  return new AuthStaffResponse({ ...data });
};
