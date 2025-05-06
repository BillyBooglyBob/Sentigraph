"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  /*   
  Set cookies for user session
  - These cookies will be used for authentication in subsequent requests
  and will be sent to the server with each request
  - The cookies are set with httpOnly and secure flags for security
  - httpOnly: true means the cookie cannot be accessed via JavaScript
  - secure: true means the cookie will only be sent over HTTPS
  - maxAge: 60 * 60 * 24 * 7 means the cookie will expire in one week 
  */
  const cookieStore = await cookies();

  cookieStore.set("session_userid", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 60 minutes
    path: "/",
  });

  cookieStore.set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}
