import { AuthTokenPair } from "./../../models/tokenPairModels";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterDto, RegisterResponseDto } from "../../models/registerModel";
import { VerifyDto, VerifyResponseDto } from "../../models/verifyModel";
import { LoginDto, LoginResponseDto } from "../../models/loginModels";
import { UserInfoDto } from "../../models/userInfoModel";

// const API_BASE_URL = import.meta.env.API_BASE_URL;
// console.log(API_BASE_URL);

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ccmernapp-11a99251a1a7.herokuapp.com",
        prepareHeaders: (headers) => {
            const authTokenPairString = localStorage.getItem("authTokenPair");
            if (!authTokenPairString) {
                return headers;
            }
            const authTokenPair: AuthTokenPair = JSON.parse(authTokenPairString);
            if (authTokenPair) {
                headers.set("Authorization", `Bearer ${authTokenPair.accessToken}`);
            }
            return headers;
        },
    }),
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
        login: builder.mutation<LoginResponseDto, LoginDto>({
            query: (loginDto) => ({
                url: `/api/auth/login`,
                method: "POST",
                body: loginDto,
            }),
        }),
        getCurrentUser: builder.query<UserInfoDto, void>({
            query: () => ({ url: `/api/user` }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyMutation,
    useLoginMutation,
    useGetCurrentUserQuery,
    useLazyGetCurrentUserQuery,
} = apiSlice;
