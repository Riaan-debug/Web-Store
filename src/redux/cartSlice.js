import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  shipment: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.cartItemId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.shipment = null;
    },
    setShipment: (state, action) => {
      state.shipment = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setShipment } = cartSlice.actions;
export default cartSlice.reducer; 