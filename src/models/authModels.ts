import { BaseRespone } from "./commonModels";

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse extends BaseRespone {}

export interface VerifyRequest {
    userName: string;
    code: string;
}

export interface VerifyResponse extends BaseRespone {
    data: AuthTokenPair;
}

export type AuthTokenPair = {
    token: string;
    refreshToken: string;
};
