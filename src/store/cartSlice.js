import { createSlice } from "@reduxjs/toolkit";
import { ToStorage, FromStorage } from "../library";

const cart = FromStorage("r130cart");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: cart ? JSON.parse(cart) : null
  },

  reducers: {
    setCart: (state, action) => {
      state.value = action.payload;

      ToStorage("r130cart", JSON.stringify(action.payload), true);
    },

    clearCart: (state) => {
      state.value = null;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
