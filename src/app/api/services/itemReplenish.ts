"use server";

import { ItemsR } from "@/types";
import jwt from "jsonwebtoken";

export const replenishItem = async (credentials: {
  username: string;
  password: string;
}, itemDetails: ItemsR) => {
  try {
    if (credentials &&itemDetails && process.env.JWT_SECRET) {
      const signed_replenish_query = jwt.sign({ credentials, itemDetails }, process.env.JWT_SECRET);

      const res = await fetch(`${process.env.SERVER_URL}/api/stores/replenish`, {
        method: "POST",
        body: JSON.stringify({ signed_replenish_query: signed_replenish_query }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json() as Promise<{
        status: number;
        statusText: string;
      }>;
    }
  } catch (error) {
    console.error("Error replenishing item (Item Control API point): ", error);
    return {
      status: 500,
      statusText: "Internal Server Error",
    }
  }
};