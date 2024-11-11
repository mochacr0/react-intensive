import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./features/tokenSlice";
import { baseApiSlice } from "./features/baseApiSlice";

export const store = configureStore({
    reducer: {
        [baseApiSlice.reducerPath]: baseApiSlice.reducer,
        token: tokenSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApiSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
