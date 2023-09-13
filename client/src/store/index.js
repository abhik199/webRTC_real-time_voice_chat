import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import activate from "./activateSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    activate,
  },
});

