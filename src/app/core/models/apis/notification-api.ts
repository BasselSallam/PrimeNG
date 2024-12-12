import { Notifications } from "../notification.model";
import { BaseAPIResponse } from "./api-mock.model";

export interface NotificationsAPIResponse extends BaseAPIResponse {
    data: Notifications;
}
