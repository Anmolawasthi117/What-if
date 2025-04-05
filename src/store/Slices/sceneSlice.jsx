// src/store/Slices/sceneSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const sceneSlice = createSlice({
  name: "scene",
  initialState: {
    input: "", // User ka input
    scenes: [], // Scenes ka array
    loading: false, // API call ke liye loading state
    error: null, // Error handling
  },
  reducers: {
    setSceneInput: (state, action) => {
      state.input = action.payload;
    },
    setScenes: (state, action) => {
      state.scenes = action.payload;
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

export const { setSceneInput, setScenes, startLoading, setError } = sceneSlice.actions;
export default sceneSlice.reducer;