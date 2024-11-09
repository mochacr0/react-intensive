import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetCategoriesDto } from "../../models/categoryModels";
import { LoginDto, LoginResponseDto } from "../../models/loginModels";
import { CreateOrderDto, CreateOrderResponseDto, GetOrdersDto } from "../../models/orderModels";
import { GetProductsDto } from "../../models/productModels";
import { RegisterDto, RegisterResponseDto } from "../../models/registerModel";
import { UserInfoDto } from "../../models/userInfoModel";
import { VerifyDto, VerifyResponseDto } from "../../models/verifyModel";
import { AuthTokenPair } from "./../../models/tokenPairModels";

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
        getOrders: builder.query<GetOrdersDto, void>({
            query: () => ({ url: `/api/shop/orders` }),
        }),
        getProducts: builder.query<GetProductsDto, void>({
            query: () => ({ url: `/api/shop/products` }),
        }),
        getCategories: builder.query<GetCategoriesDto, void>({
            query: () => ({ url: `/api/shop/categories` }),
        }),
        placeOrder: builder.mutation<CreateOrderResponseDto, CreateOrderDto>({
            query: (createOrderDto) => ({
                url: `/api/shop/order/create`,
                method: "POST",
                body: createOrderDto,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyMutation,
    useLoginMutation,
    useLazyGetCurrentUserQuery,
    useGetOrdersQuery,
    useGetProductsQuery,
    useGetCategoriesQuery,
    usePlaceOrderMutation,
} = apiSlice;
