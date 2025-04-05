// src/components/Homepage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSceneInput, setScenes, startLoading, setError } from "../store/Slices/sceneSlice";
import sceneWrapper from "../utils/sceneWrapper";
import InputBox from "./InputBox";
import StoryDisplay from "./StoryDisplay";

const Homepage = () => {
  const dispatch = useDispatch();
  const { scenes, loading, error } = useSelector((state) => state.scene);

  const handleSubmit = async (input) => {
    if (input.trim() === "") {
      alert("Bhai, kuch toh likh pehle!");
      return;
    }

    dispatch(setSceneInput(input)); // Input save karo
    dispatch(startLoading()); // Loading shuru

    try {
      const scenesData = await sceneWrapper(input);
      if (scenesData.length === 0) {
        throw new Error("Koi scene nahi mila!");
      }
      dispatch(setScenes(scenesData)); // Scenes save karo
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">What if...</h1>

      {/* Input Box */}
      <InputBox onSubmit={handleSubmit} />

      {/* Loader ya Story */}
      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="mt-8 text-red-500">Error: {error}</p>
      ) : scenes.length > 0 ? (
        <StoryDisplay scenes={scenes} />
      ) : (
        <p className="mt-8 text-gray-400">Apna scenario daal ke story dekho!</p>
      )}
    </div>
  );
};

export default Homepage;