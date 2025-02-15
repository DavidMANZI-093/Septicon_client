"use server";

import { Stations } from "@/types";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";


export const verifyStations = async (stationsToken: string) => {
  try {
    const verifiedToken = await jwtVerify(
      stationsToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verifiedToken.payload.stationsData as unknown as Stations[];
  } catch (error) {
    if (!(error instanceof JWTExpired)) {
      console.error("Error verifying token: ", error);
    }
    return null;
  }
};