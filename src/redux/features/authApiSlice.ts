import { LoginRequest, LoginResponse, VerifyRequest, VerifyResponse } from "../../models/authModels";
import { baseApiSlice } from "./baseApiSlice";

const authApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        verify: builder.mutation<VerifyResponse, VerifyRequest>({
            query: (verifyRequest) => ({
                url: `/api/auth/verify`,
                method: "POST",
                body: verifyRequest,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (loginRequest) => ({
                url: `/api/auth/login`,
                method: "POST",
                body: loginRequest,
            }),
        }),
    }),
});

export const { useVerifyMutation, useLoginMutation } = authApiSlice;
