import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterDto, RegisterResponseDto } from "../../models/registerModel";
import { VerifyDto, VerifyResponseDto } from "../../models/verifyModel";

const API_BASE_URL = import.meta.env.API_BASE_URL;
console.log(API_BASE_URL);

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ccmernapp-11a99251a1a7.herokuapp.com" }),
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponseDto, RegisterDto>({
            query: (registerDto) => ({
                url: `/api/auth/register`,
                method: "POST",
                body: registerDto,
            }),
        }),
        verify: builder.mutation<VerifyResponseDto, VerifyDto>({
            query: (verifyDto) => ({
                url: `/api/auth/verify`,
                method: "POST",
                body: verifyDto,
            }),
        }),
    }),
});

export const { useRegisterMutation, useVerifyMutation } = apiSlice;
