import { Authenticator } from "remix-auth";

import { FormStrategy } from "remix-auth-form";
import { authStaff } from "./authController";
import { sessionStorage } from "./session.service";

const authenticator = new Authenticator(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const user = await authStaff(email, password);
  if (typeof user === "string") {
    throw Error(user);
  }

  return user;
});

authenticator.use(formStrategy, "form");

export { authenticator };
