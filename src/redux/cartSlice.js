import { createSlice } from '@reduxjs/toolkit';
import { loadCart } from './persistState';

const savedCart = loadCart();

const initialState = {
  items: savedCart.items,
  shipment: savedCart.shipment,
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
