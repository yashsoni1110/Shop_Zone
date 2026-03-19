import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 2000,
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const cat = action.payload;
      if (state.categories.includes(cat)) {
        state.categories = state.categories.filter(c => c !== cat);
      } else {
        state.categories.push(cat);
      }
    },
    toggleBrand: (state, action) => {
      const brand = action.payload;
      if (state.brands.includes(brand)) {
        state.brands = state.brands.filter(b => b !== brand);
      } else {
        state.brands.push(brand);
      }
    },
    // Keep old name for backward compat — sets maxPrice
    setPriceRange: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.categories = [];
      state.brands = [];
      state.minPrice = 0;
      state.maxPrice = 2000;
      state.searchTerm = "";
    },
  },
});

export const {
  toggleCategory, toggleBrand,
  setPriceRange, setMinPrice, setMaxPrice,
  setSearchTerm, clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;