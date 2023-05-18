
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})