"use server";

import jwt from "jsonwebtoken";

export const deleteItem = async (credentials: {
  username: string;
  password: string;
}, itemId: string) => {
  try {
    if (credentials && itemId && process.env.JWT_SECRET) {
      const signed_del_query = jwt.sign({ credentials, itemId }, process.env.JWT_SECRET);

      const res = await fetch(`${process.env.SERVER_URL}/api/stores/delete`, {
        method: "POST",
        body: JSON.stringify({ signed_del_query: signed_del_query }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json() as Promise<{
        status: number;
        statusText: string;
      }>;
    }
  } catch (error) {
    console.error("Error deleting item (Item Control API point): ", error);
    return {
      status: 500,
      statusText: "Internal Server Error",
    }
  }
};