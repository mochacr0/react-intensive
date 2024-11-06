import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counterSlice";
import { apiSlice } from "./features/apiSlice";
import { tokenSlice } from "./features/tokenSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        counter: counterSlice.reducer,
        token: tokenSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
