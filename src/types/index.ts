import { LucideIcon } from "lucide-react";

export interface UserObject {
  id: string;
  username: string;
  fullName: string;
  role: string;
  rank: string;
  stationName: string;
  email: string | null;
  iat: number;
  exp: number;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  icon: LucideIcon;
  iconColor: string;
  barColor: string;
}

export interface Platform {
  id: string;
  name: string;
  description: string;
  href: string;
}

export interface Inventory {
  name: string;
  quantity: number;
  unitOfMeasure: string;
  reorderPoint: number;
  lastUpdated: Date;
  storeRow: number;
  storeCol: number;
  shelfRow: number;
  shelfCol: number;
}

export interface Items {
  id: string;
  name: string;
  description: string;
  reorderPoint: number;
  unitOfMeasure: string;
}

export interface ItemsA {
  name: string;
  storeId: string;
  reorderPoint: number;
  unitOfMeasure: string;
  description: string;
  quantity: number | null | undefined;
}

export interface ItemsS {
  id: string;
  reason: string;
  targetStationId: string | null | undefined;
  quantity: number;
}

export interface ItemsR {
  id: string;
  reason: string;
  sourceStationId: string | null | undefined;
  quantity: number;
}

export interface Stations {
  id: string;
  name: string;
  location: string;
}
