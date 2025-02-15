"use client";

import { createContext, useContext, useEffect, useState } from "react";

type sidebarContextProps = {
    isOpen: boolean,
    toggleSidebar: () => void;
};

const SidebarContext = createContext<sidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (typeof window !== undefined) {
            const storedValue = sessionStorage.getItem('sidebarState');

            if (storedValue === 'false') {
                setIsOpen(false);
            }
        }
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        if (typeof window !== undefined) {
            sessionStorage.setItem('sidebarState', `${isOpen}`);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined')
            sessionStorage.setItem('sidebarState', `${isOpen}`);
    }, [isOpen]);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {

    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("useSidebarContext must be use within a SidebarProvider.");
    }

    return context;
};