"use client"
import { configureStore } from '@reduxjs/toolkit';
import todoSlice from "./features/todos/todosSlice"
import authSlice from "./features/auth/authSlice"

export const makeStore = () => configureStore({
  reducer: {
    todo: todoSlice,
    auth: authSlice
  }
})

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']