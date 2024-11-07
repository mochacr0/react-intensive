import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthTokenPair } from "../../models/tokenPairModels";

const initialState: AuthTokenPair = localStorage.getItem("authTokenPair")
    ? JSON.parse(localStorage.getItem("authTokenPair") as string)
    : {};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setAuthTokenPair: (state, action: PayloadAction<AuthTokenPair>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem("authTokenPair", JSON.stringify(action.payload));
        },
        clearAuthTokenPair: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            localStorage.removeItem("authTokenPair");
        },
    },
});

export const { setAuthTokenPair, clearAuthTokenPair } = tokenSlice.actions;

export default tokenSlice.reducer;
