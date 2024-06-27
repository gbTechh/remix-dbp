import { IAuthStaff } from "~/interfaces";
import { AuthStaffResponse } from ".";

export const mappedResponseAuthStaffData = function toResponseModel(data: IAuthStaff) {
  return new AuthStaffResponse({ ...data });
};
