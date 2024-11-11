import {
    CompleteOrderRequest,
    CompleteOrderResponse,
    GetOrdersRequest,
    PlaceOrderRequest,
    PlaceOrderResponse,
} from "../../models/orderModels";
import { baseApiSlice } from "./baseApiSlice";

const orderApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<GetOrdersRequest, void>({
            query: () => ({ url: `/api/shop/orders` }),
            providesTags: ["Order"],
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

export const { useGetOrdersQuery, useLazyGetOrdersQuery, usePlaceOrderMutation, useCompleteOrderMutation } =
    orderApiSlice;
