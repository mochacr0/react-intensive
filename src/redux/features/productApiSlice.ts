import {
    AddProductRequest,
    AddProductResponse,
    DeleteProductResponse,
    GetProductResponse,
} from "../../models/productModels";
import { baseApiSlice } from "./baseApiSlice";

const productApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery, useAddProductMutation, useDeleteProductByIdMutation } =
    productApiSlice;
