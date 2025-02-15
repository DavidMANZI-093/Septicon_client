"use server";

import { Inventory } from "@/types";
import { verifyInventory } from "@/utils/lib/verify-inventory";

export const fetchInventory = async (storeId: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/api/stores/inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bear ${process.env.JWT_SECRET}`
        },
        body: JSON.stringify({ storeId: storeId })
    });

    const signedInventory = await res.json();

    const unsignedInventory = verifyInventory(signedInventory.signedInventory) as unknown as Inventory[];

    return unsignedInventory;
};