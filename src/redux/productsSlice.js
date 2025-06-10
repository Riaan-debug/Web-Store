import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import yogamats from '../images/yogamats.jpg';
import dumbbell from '../images/dumbbell.webp';
import waterbottle from '../images/waterbottle.jpg';
import resistancebands from '../images/resistancebands.webp';
import jumprope from '../images/jumprope.webp';
import foamroller from '../images/foamroller.jpg';
import fitnesstracker from '../images/fitnesstracker.webp';
import pushupbars from '../images/pushupbars.webp';

const initialState = {
  products: [
    {
      id: uuidv4(),
      name: 'Yoga Mat',
      description: 'Non-slip, eco-friendly, available in various colors.',
      price: 299,
      image: yogamats,
    },
    {
      id: uuidv4(),
      name: 'Dumbbell Set',
      description: 'Adjustable weights, neoprene coating for comfort.',
      price: 799,
      image: dumbbell,
    },
    {
      id: uuidv4(),
      name: 'Water Bottle',
      description: 'Stainless steel, insulated, 1L capacity.',
      price: 199,
      image: waterbottle,
    },
    {
      id: uuidv4(),
      name: 'Resistance Bands',
      description: 'Set of 5 bands, different strengths for all workouts.',
      price: 249,
      image: resistancebands,
    },
    {
      id: uuidv4(),
      name: 'Jump Rope',
      description: 'Adjustable length, smooth ball bearings.',
      price: 149,
      image: jumprope,
    },
    {
      id: uuidv4(),
      name: 'Foam Roller',
      description: 'High-density foam, perfect for muscle recovery.',
      price: 349,
      image: foamroller,
    },
    {
      id: uuidv4(),
      name: 'Fitness Tracker',
      description: 'Tracks heart rate, steps, and sleep.',
      price: 1299,
      image: fitnesstracker,
    },
    {
      id: uuidv4(),
      name: 'Push-Up Bars',
      description: 'Ergonomic design, anti-slip base for safety.',
      price: 229,
      image: pushupbars,
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer; 