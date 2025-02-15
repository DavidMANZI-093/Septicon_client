"use server";

import { ItemsA } from "@/types";
import jwt from "jsonwebtoken";

export const addItem = async (credentials: {
  username: string;
  password: string;
}, itemDetails: ItemsA) => {
  try {
    if (credentials &&itemDetails && process.env.JWT_SECRET) {
      const signed_create_query = jwt.sign({ credentials, itemDetails }, process.env.JWT_SECRET);

      const res = await fetch(`${process.env.SERVER_URL}/api/stores/add`, {
        method: "POST",
        body: JSON.stringify({ signed_create_query: signed_create_query }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json() as Promise<{
        status: number;
        statusText: string;
      }>;
    }
  } catch (error) {
    console.error("Error creating item (Item Control API point): ", error);
    return {
      status: 500,
      statusText: "Internal Server Error",
    }
  }
};