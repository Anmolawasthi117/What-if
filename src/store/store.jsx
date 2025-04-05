import { configureStore } from "@reduxjs/toolkit";
import sceneReducer from "./Slices/sceneSlice"; 
import imageReducer from "./Slices/imageSlice"; 

const appStore = configureStore({
  reducer: {
    scene: sceneReducer,
    image: imageReducer,
  },
});

export default appStore;