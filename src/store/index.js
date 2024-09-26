import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import cartReducer from "./cartSlice";

export { setUser, clearUser } from "./userSlice";

export { setCart, clearCart } from "./cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
