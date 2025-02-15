"use server";

import { SessionProvider } from '@/app/context/sessionContext';
import { cookies } from 'next/headers';
import React from 'react';

// type Props = {}

const CookieWrapper = async ({ children }: { children: React.ReactNode }) => {

    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    return (
        <SessionProvider props={{ cookies: authToken }}>
            {children}
        </SessionProvider>
    )
}

export default CookieWrapper;