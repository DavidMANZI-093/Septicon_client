"use server";

import { Platform } from "@/types";
import { verifyPlatyforms } from "@/utils/lib/verify-platforms";

export const fetchPlatforms = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/api/stores/platforms`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bear ${process.env.JWT_SECRET}`
        }
    });

    const signedPlatforms = await res.json();

    const unsignedPlatforms = verifyPlatyforms(signedPlatforms.signedPlatforms) as unknown as Platform[];

    return unsignedPlatforms;
};