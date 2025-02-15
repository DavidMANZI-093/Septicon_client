"use server";

import { Items } from "@/types";
import { verifyItems } from "@/utils/lib/verify-items";

export const fetchItems = async (storeId: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/api/stores/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bear ${process.env.JWT_SECRET}`
        },
        body: JSON.stringify({ storeId: storeId })
    });

    const signedItems = await res.json();

    const unsignedItems = verifyItems(signedItems.signedItems) as unknown as Items[];

    return unsignedItems;
}