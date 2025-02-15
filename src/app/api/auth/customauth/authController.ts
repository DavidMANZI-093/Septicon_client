"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const signIn = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    if (credentials && process.env.JWT_SECRET) {
      const signed_credentials = jwt.sign(credentials, process.env.JWT_SECRET);

      const res = await fetch(`${process.env.SERVER_URL}/api/authenticate`, {
        method: "POST",
        body: JSON.stringify({ signed_credentials: signed_credentials }),
        headers: { "Content-Type": "application/json" },
      });

      const signed_token = await res.json();

      if (signed_token.token && res.ok) {
        const cookieData = {
          value: signed_token.token,
          options: { httpOnly: true, path: "/" },
        };

        (await cookies()).set("authToken", cookieData.value, {
          httpOnly: cookieData.options.httpOnly,
          path: cookieData.options.path,
          sameSite: "strict",
        });

        return {
          status: 200,
          statusText: "OK",
        }

      } else {
        return {
          status: 401,
          statusText: "Unauthorized",
        };
      }
    }
  } catch (error) {
    console.error("Error signing in (Auth Control API point): ", error);
    return {
      status: 500,
      statusText: "Internal Server Error",
    }
  }
};
