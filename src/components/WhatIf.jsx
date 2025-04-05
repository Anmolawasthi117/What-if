import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const WhatIf = () => {
  const { data } = useSelector((state) => state.data);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Reset animation state when data changes
  useEffect(() => {
    setCurrentSceneIndex(0);
    setShowImage(false);
    setIsPlaying(false);
  }, [data]);

  // Progress through scenes
  useEffect(() => {
    if (!data || data.length === 0 || !isPlaying) return;

    // Show text first
    const imageTimer = setTimeout(() => {
      setShowImage(true);
    }, 5000); // Show image after 3.5 seconds

    // Progress to next scene
    const sceneTimer = setTimeout(() => {
      if (currentSceneIndex < data.length - 1) {
        setCurrentSceneIndex((prev) => prev + 1);
        setShowImage(false);
      }
    }, 8000); // Progress every 8 seconds

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(sceneTimer);
    };
  }, [currentSceneIndex, isPlaying, data]);

  // Handle audio playback
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio play failed:", err));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Function to check if URL is valid or a blob URL
  const getImageSrc = (url) => {
    if (!url) return "/placeholder-image.jpg";

    // Check if it's a blob URL or valid URL
    if (url.startsWith("blob:") || url.startsWith("http")) {
      return url;
    }

    // Fallback to placeholder if URL is invalid
    return "/placeholder-image.jpg";
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Loading what-if scenarios...
      </div>
    );
  }

  const currentScene = data[currentSceneIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/path-to-background-audio.mp3"
        loop
        className="hidden"
      />

      {/* Controls */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">What If...?</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
          >
            {isPlaying ? "Pause" : "Play"} Story
          </button>
          <button
            onClick={() => {
              setCurrentSceneIndex(0);
              setShowImage(false);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition"
          >
            Restart
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-300 rounded-full mb-8">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentSceneIndex + 1) / data.length) * 100}%` }}
        />
      </div>

      {/* Whiteboard area */}
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto mb-8 min-h-96">
        <div className="flex flex-col items-center justify-center">
          {/* Scene counter */}
          <div className="text-sm text-gray-500 mb-6">
            Scene {currentSceneIndex + 1} of {data.length}
          </div>

          {/* Story content */}
          <div className="relative w-full mb-3">
            {/* Image */}

            {/* Script text */}
            <motion.div
              key={currentScene.sceneId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center p-4 bg-indigo-50 rounded-lg shadow-sm"
            >
              <p className="text-xl font-medium text-gray-800 leading-relaxed">
                {currentScene.script}
              </p>
            </motion.div>
          </div>
          <AnimatePresence>
            {showImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex justify-center"
              >
                <img
                  src={getImageSrc(currentScene.imageUrl)}
                  alt={`Scene ${currentSceneIndex + 1}`}
                  className="rounded-lg shadow-md max-h-64 object-contain"
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      currentScene.imageURL
                    );
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt display */}
        </div>
      </div>

      {/* Scene navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSceneIndex(index);
              setShowImage(false);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentSceneIndex ? "bg-indigo-600" : "bg-gray-300"
            }`}
            aria-label={`Go to scene ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatIf;
