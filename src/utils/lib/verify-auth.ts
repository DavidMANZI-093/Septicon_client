"use server";

import { UserObject } from "@/types";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";


export const verifyAuth = async (authToken: string) => {
  try {
    const verifiedToken = await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verifiedToken.payload as unknown as UserObject;
  } catch (error) {
    if (!(error instanceof JWTExpired)) {
      console.error("Error verifying token: ", error);
    }
    return null;
  }
};
