// src/store/Slices/imageSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    images: [], 
    loading: false, 
    error: null, 
  },
  reducers: {
    
    setImages: (state, action) => {
      state.images = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setImages, startLoading, setError } = imageSlice.actions;
export default imageSlice.reducer;