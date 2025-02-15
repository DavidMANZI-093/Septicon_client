"use client";

import { notificationEmitter } from "@/services/notificationService";
import { Notification } from "@/types";
import { randomBytes } from "crypto";
import React, { createContext, useContext, useEffect, useState } from "react";

interface NotificationContextValue {
    notifications: Notification[];
    addNotifications: (notification: Notification) => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const handleNotification = (notification: Notification) => {
            const id = randomBytes(4).toString("hex");
            setNotifications((prev) => [...prev, { ...notification, id: id }] as Notification[]);
            setTimeout(() => {
                setNotifications((prev) => prev.filter((notif) => notif.id !== id));
            }, 5000);
        };

        notificationEmitter.on("notification", handleNotification);

        return () => {
            notificationEmitter.off("notification", handleNotification);
        }

    }, []);

    const value = {
        notifications,
        addNotifications: (notification: Notification) => {
            setNotifications((prev) => [...prev,{ ...notification, id: randomBytes(4).toString("hex") }]);
        },
        removeNotification: (id: string) => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};