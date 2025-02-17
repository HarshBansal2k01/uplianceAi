// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import editorReducer from "./slices/editorSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
