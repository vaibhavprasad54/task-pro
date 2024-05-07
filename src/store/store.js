import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice/todoSlice";


//-------Setting up Redux Toolkit Store--------
export const store = configureStore({
    reducer: todoReducer
})