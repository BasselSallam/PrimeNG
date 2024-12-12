import { MetaData } from "./metadata.model";

export interface Notfication {
    id: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    type: string;
}

export interface Notifications {
    notifications: Notfication[];
    metaData: MetaData;
}
