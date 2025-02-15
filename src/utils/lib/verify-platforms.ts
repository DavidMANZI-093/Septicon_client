"use server";

import { Platform } from "@/types";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";


export const verifyPlatyforms = async (platformsToken: string) => {
  try {
    const verifiedToken = await jwtVerify(
      platformsToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verifiedToken.payload.platformData as unknown as Platform[];
  } catch (error) {
    if (!(error instanceof JWTExpired)) {
      console.error("Error verifying token: ", error);
    }
    return null;
  }
};
