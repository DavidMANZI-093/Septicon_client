"use server";

import { Items } from "@/types";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";


export const verifyItems = async (itemsToken: string) => {
  try {
    const verifiedToken = await jwtVerify(
      itemsToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verifiedToken.payload.itemsData as unknown as Items[];
  } catch (error) {
    if (!(error instanceof JWTExpired)) {
      console.error("Error verifying token: ", error);
    }
    return null;
  }
};
