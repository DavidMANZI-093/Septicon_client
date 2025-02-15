"use client";

import { createContext, useContext, useState } from "react";

type HeaderContextProps = {
    nextCrumb: string | null,
    addCrumb: (crumb: string) => void;
};

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [nextCrumb, setNextCrumb] = useState<string | null>(null);

    const addCrumb = (crumb: string) => {
        setNextCrumb(crumb);
    };

    return (
        <HeaderContext.Provider value={{ nextCrumb, addCrumb }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => {

    const context = useContext(HeaderContext);

    if (!context) {
        throw new Error("useHeaderContext must be use within a HeaderProvider.");
    }

    return context;
};