"use server";

import { Stations } from "@/types";
import { verifyStations } from "@/utils/lib/verify-stations";

export const fetchStations = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/api/stations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bear ${process.env.JWT_SECRET}`
        }
    });

    const signedStations = await res.json();

    const unsignedStations = verifyStations(signedStations.signedStations) as unknown as Stations[];

    return unsignedStations;
};