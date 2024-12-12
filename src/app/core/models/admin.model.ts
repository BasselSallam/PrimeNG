import { MetaData } from "./metadata.model";

export type AdminStatus = "active" | "inactive" | "invited" | "deleted";
export interface Admin {
    id: number;
    name: string;
    countryCode: string;
    phone: string;
    email: string;
    status: AdminStatus;
    profilePictureSignedUrl: string | null;
    createdAt: string;
}

export interface AdminsData {
    admins: Admin[];
    metaData: MetaData;
}

export interface SingleAdminData {
    admin: Admin;
}
