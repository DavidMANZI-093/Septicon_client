"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { notify } from "@/services/notificationService";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/utils/lib/verify-auth";
import { UserObject } from "@/types";

interface SessionContextType {
    user: UserObject | null,
    loading: boolean,
};

type ProviderProps = {
    cookies: string | undefined;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children, props }: { children: React.ReactNode, props: ProviderProps }) => {
    const [session, setSession] = useState<SessionContextType>({ user: null, loading: true });

    useEffect(() => {

        let isMounted = true;

        const checkAuthStatus = async () => {
            try {

                if (!isMounted) return;

                const authToken = props.cookies;

                if (authToken) {
                    const decodedData = await verifyAuth(authToken) as unknown as UserObject;

                    if (decodedData) {
                        if (isMounted) {
                            setSession({ user: decodedData, loading: false });
                            if (typeof window !== 'undefined' && sessionStorage?.getItem('welcomeMsgShown') !== 'true') {
                                notify({ title: "Authentication Success", message: `Welcome back, ${(decodedData.fullName.split(' '))[1]}!`, icon: ShieldCheck, iconColor: "text-green-600", barColor: "bg-green-600" });
                            }
                            if (typeof window !== 'undefined') sessionStorage.setItem('welcomeMsgShown', 'true');
                        }
                    } else {
                        if (isMounted) {
                            setSession(({ user: null, loading: false }));
                            redirect(`/signin`);
                        }
                    }
                }

            } catch (error) {
                console.error('Error verifying token or parsing', error);
                if (isMounted) {
                    setSession({ user: null, loading: false });
                    notify({ title: "Authentication", message: "Something went wrong!", icon: ShieldAlert, iconColor: "text-red-600", barColor: "bg-red-600" });
                    redirect(`/signin`);
                }
            };
        };

        checkAuthStatus();
        return () => {
            isMounted = false;
        }

    }, [props.cookies]);

    const value: SessionContextType = session;

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );

};

export const useSessionContext = () => {
    return useContext(SessionContext);
};