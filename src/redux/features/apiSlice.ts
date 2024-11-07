import { AuthTokenPair } from "./../../models/tokenPairModels";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterDto, RegisterResponseDto } from "../../models/registerModel";
import { VerifyDto, VerifyResponseDto } from "../../models/verifyModel";
import { LoginDto, LoginResponseDto } from "../../models/loginModels";
import { UserInfoDto } from "../../models/userInfoModel";
import { OrderDto } from "../../models/orderModels";
import { orderSamples } from "../../common/mock/orderSamples";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}`,
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
        getOrders: builder.query<OrderDto[], void>({
            queryFn: async () => {
                async function getOrderSamples(): Promise<OrderDto[]> {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(orderSamples);
                        }, 5000);
                    });
                }
                console.log("Heyyyy");
                const orders = await getOrderSamples();

                return { data: orders };
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyMutation,
    useLoginMutation,
    useGetCurrentUserQuery,
    useLazyGetCurrentUserQuery,
    useGetOrdersQuery,
} = apiSlice;
