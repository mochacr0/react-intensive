import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthTokenPair, LoginRequest, LoginResponse, VerifyRequest, VerifyResponse } from "../../models/authModels";
import { GetCategoriesResponse } from "../../models/categoryModels";
import {
    CompleteOrderRequest,
    CompleteOrderResponse,
    GetOrdersRequest,
    PlaceOrderRequest,
    PlaceOrderResponse,
} from "../../models/orderModels";
import {
    AddProductRequest,
    AddProductResponse,
    DeleteProductResponse,
    GetProductResponse,
} from "../../models/productModels";
import { RegisterRequest, RegisterResponse } from "../../models/registerModel";
import { GetUserInfoResponse } from "../../models/userInfoModel";

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
                headers.set("Authorization", `Bearer ${authTokenPair.token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User", "Order", "Product", "Category"],
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (registerRequest) => ({
                url: `/api/auth/register`,
                method: "POST",
                body: registerRequest,
            }),
        }),
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
        getUserInfo: builder.query<GetUserInfoResponse, void>({
            query: () => ({ url: `/api/user` }),
        }),
        getOrders: builder.query<GetOrdersRequest, void>({
            query: () => ({ url: `/api/shop/orders` }),
            providesTags: ["Order"],
        }),
        getProducts: builder.query<GetProductResponse, void>({
            query: () => ({ url: `/api/shop/products` }),
            providesTags: ["Product"],
        }),
        addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
            query: (addProductRequest) => ({
                url: `/api/shop/product`,
                method: "POST",
                body: addProductRequest,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProductById: builder.mutation<DeleteProductResponse, string>({
            query: (productId) => ({
                url: `/api/shop/product/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
        getCategories: builder.query<GetCategoriesResponse, void>({
            query: () => ({ url: `/api/shop/categories` }),
        }),
        placeOrder: builder.mutation<PlaceOrderResponse, PlaceOrderRequest>({
            query: (placeOrderRequest) => ({
                url: `/api/shop/order/create`,
                method: "POST",
                body: placeOrderRequest,
            }),
            invalidatesTags: ["Order", "Product"],
        }),
        completeOrder: builder.mutation<CompleteOrderResponse, CompleteOrderRequest>({
            query: (completeOrderRequest) => ({
                url: `/api/shop/order/complete`,
                method: "POST",
                body: completeOrderRequest,
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useVerifyMutation,
    useLoginMutation,
    useLazyGetUserInfoQuery,
    useGetCategoriesQuery,
    useGetProductsQuery,
    useLazyGetProductsQuery,
    useAddProductMutation,
    useDeleteProductByIdMutation,
    useGetOrdersQuery,
    useLazyGetOrdersQuery,
    usePlaceOrderMutation,
    useCompleteOrderMutation,
} = apiSlice;
