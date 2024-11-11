import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthTokenPair } from "../../models/authModels";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApiSlice = createApi({
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
    endpoints: () => ({}),
});
