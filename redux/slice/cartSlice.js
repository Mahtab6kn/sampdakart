import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],

    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    addItemToCart: (state, action) => {
      state.items = action.payload;
    },

    updateItemQuantity: (state, action) => {
      const { itemId, quantity, color, size } = action.payload;

      const itemIndex = state.items.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += Number(
          Number(item.price - (item.discount / 100) * item.price) *
            (quantity - item.quantity)
        );

        state.items[itemIndex].quantity = quantity;
        state.items[itemIndex].color = color;
        state.items[itemIndex].size = size;
      }
    },

    updateCart: (state, action) => {
      const { totalQuantity, totalPrice } = action.payload;

      state.totalQuantity = Number(totalQuantity);
      state.totalPrice = Number(totalPrice);
    },

    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === itemId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        state.totalQuantity -= item.quantity;
        state.totalPrice -=
          Number(item.price - (item.discount / 100) * item.price) *
          item.quantity;

        state.items.splice(itemIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  updateItemQuantity,
  updateCart,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
