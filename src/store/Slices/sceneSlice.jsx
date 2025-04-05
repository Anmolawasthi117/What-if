// src/store/Slices/sceneSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const sceneSlice = createSlice({
  name: "scene",
  initialState: {
    input: "",
    scenes: [],
  },
  reducers: {
    setSceneInput: (state, action) => {
      state.input = action.payload;
    },
    setScenes: (state, action) => {
      state.scenes = action.payload;
    },
  },
});

export const { setSceneInput, setScenes } = sceneSlice.actions;
export default sceneSlice.reducer; // Default export yahan hai