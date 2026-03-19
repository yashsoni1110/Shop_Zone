import { createSlice } from "@reduxjs/toolkit";

const getStored = () => {
  try {
    const s = localStorage.getItem("shopzone_wishlist");
    return s ? JSON.parse(s) : [];
  } catch { return []; }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: getStored() },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const idx = state.items.findIndex(i => i.id === product.id);
      if (idx !== -1) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(product);
      }
      localStorage.setItem("shopzone_wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("shopzone_wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("shopzone_wishlist");
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
