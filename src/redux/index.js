import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { authReducer } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { categoryReducer } from "./categorySlice";
import { productReducer } from "./productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          navigate: useNavigate,
        },
      },
    }),
})

