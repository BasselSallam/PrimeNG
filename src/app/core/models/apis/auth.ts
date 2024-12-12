import { User } from "../user.model";
import { BaseAPIResponse } from "./api-mock.model";

export interface LoginResponse extends BaseAPIResponse {
    data: {
        user: User;
        firstTimeToken?: string;
        accessToken?: string;
        refreshToken?: string;
        forgetPasswordToken?: string;
    };
}

export interface RefreshResponse extends BaseAPIResponse {
    data: {
        accessToken: string;
    };
}
