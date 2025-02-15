import { UserObject } from "@/types";
// import { redirect } from "next/navigation"; // The redirect function might cause some trouble when used in a useEffect hook...
// I have something somewhere else replacing it...
import { useEffect, useState } from "react";

export const useSessionWatcher = (session: UserObject | null | undefined) => {
    const [isValid, setIsValid] = useState(true);
    const [countDown, setCountDown] = useState<string | null>(null);
    const [timeLeftPrcnt, setTimeLeftPrcnt] = useState<number | null>(null);

    useEffect(() => {
        if (session?.exp) {

            const totalDuration = session.exp - session.iat;

            const updateCountDown = () => {
                const currentTime = Math.floor(Date.now() / 1000);
                const remainingTime = session.exp - currentTime;

                if (remainingTime > 0) {

                    const hrs = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
                    const mns = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
                    const scs = (remainingTime % 60).toString().padStart(2, '0');

                    setCountDown(`${hrs}:${mns}:${scs}`);

                    const prcnt = Math.round((remainingTime / totalDuration) * 100);
                    setTimeLeftPrcnt(prcnt);

                    const timer = setTimeout(() => {
                        setIsValid(false);
                        // redirect(`/signin`);
                    }, remainingTime * 1000);

                    return () => clearTimeout(timer);
                } else {
                    setIsValid(false);
                    // redirect(`/signin`);
                }
            };

            updateCountDown();
            const interval = setInterval(updateCountDown, 1000);

            return () => clearInterval(interval);

        }
    }, [session?.exp, session?.iat]);

    return { isValid, countDown, timeLeftPrcnt };
};