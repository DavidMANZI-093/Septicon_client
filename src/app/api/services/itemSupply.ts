"use server";

import { ItemsS } from "@/types";
import jwt from "jsonwebtoken";

export const supplyItem = async (credentials: {
  username: string;
  password: string;
}, itemDetails: ItemsS) => {
  try {
    if (credentials &&itemDetails && process.env.JWT_SECRET) {
      const signed_supply_query = jwt.sign({ credentials, itemDetails }, process.env.JWT_SECRET);

      const res = await fetch(`${process.env.SERVER_URL}/api/stores/supply`, {
        method: "POST",
        body: JSON.stringify({ signed_supply_query: signed_supply_query }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json() as Promise<{
        status: number;
        statusText: string;
      }>;
    }
  } catch (error) {
    console.error("Error supplying item (Item Control API point): ", error);
    return {
      status: 500,
      statusText: "Internal Server Error",
    }
  }
};