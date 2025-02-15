import { EventEmitter } from "events";
import { Notification } from "@/types";

export const notificationEmitter = new EventEmitter();

export const notify = (notification: Notification) => {
    notificationEmitter.emit("notification", notification);
};