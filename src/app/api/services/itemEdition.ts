"use server";

import { Items } from "@/types";
import jwt from "jsonwebtoken";

export const editItem = async (credentials: {
  username: string;
  password: string;
}, itemDetails: Items) => {
  try {
    if (credentials &&itemDetails && process.env.JWT_SECRET) {
      const signed_edit_query = jwt.sign({ credentials, itemDetails }, process.env.JWT_SECRET);

      const res = await fetch(`${process.env.SERVER_URL}/api/stores/edit`, {
        method: "POST",
        body: JSON.stringify({ signed_edit_query: signed_edit_query }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json() as Promise<{
        status: number;
        statusText: string;
      }>;
    }
  } catch (error) {
    console.error("Error editing item (Item Control API point): ", error);
    return {
      status: 500,
      statusText: "Internal Server Error",
    }
  }
};