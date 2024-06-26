import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["asd082137ahjsd_kasd8"], // replace this with an actual secret
    //secure: false, // enable this in prod only
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
