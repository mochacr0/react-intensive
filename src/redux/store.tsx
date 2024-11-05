import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counterSlice";
import { apiSlice } from "./features/apiSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
