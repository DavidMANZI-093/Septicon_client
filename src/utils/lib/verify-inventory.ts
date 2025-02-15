"use server";

import { Inventory } from "@/types";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";


export const verifyInventory = async (inventoryToken: string) => {
  try {
    const verifiedToken = await jwtVerify(
      inventoryToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verifiedToken.payload.inventoryData as unknown as Inventory[];
  } catch (error) {
    if (!(error instanceof JWTExpired)) {
      console.error("Error verifying token: ", error);
    }
    return null;
  }
};
