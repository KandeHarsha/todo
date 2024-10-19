"use client"
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "./features/todos/todosSlice"

export const makeStore = () => configureStore({
  reducer: {todoReducer}
})

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']