import { RegisterRequest, RegisterResponse } from "../../models/registerModel";
import { GetUserInfoResponse } from "../../models/userInfoModel";
import { baseApiSlice } from "./baseApiSlice";

const userApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (registerRequest) => ({
                url: `/api/auth/register`,
                method: "POST",
                body: registerRequest,
            }),
        }),
        getUserInfo: builder.query<GetUserInfoResponse, void>({
            query: () => ({ url: `/api/user` }),
        }),
    }),
});

export const { useRegisterMutation, useLazyGetUserInfoQuery } = userApiSlice;
