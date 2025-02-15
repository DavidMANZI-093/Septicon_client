"use server";

import { UserObject } from "@/types";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";


export const killSession = async (session: UserObject | null | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session = null;
    (await cookies()).delete("authToken");
    redirect(`/signin`);
};