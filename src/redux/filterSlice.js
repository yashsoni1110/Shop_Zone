import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  priceRange: 1000,
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,    
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setPriceRange, setSearchTerm } = filterSlice.actions;
export default filterSlice.reducer;