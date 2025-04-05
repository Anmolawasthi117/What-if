// src/components/Homepage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSceneInput } from "../store/Slices/sceneSlice"; 

const Homepage = () => {
  const [input, setInput] = useState(""); // Local state for input
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Bhai, kuch toh likh pehle!");
      return;
    }
    // Input ko Redux store mein save karo
    dispatch(setSceneInput(input));
    // Story page pe redirect karo
    navigate("/story");
    setInput(""); // Input clear kar do
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">What if...</h1>

      {/* Chat Input Box */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center bg-gray-800 rounded-lg p-2 shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Apna 'What if' scenario likh de..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Optional Hint */}
      <p className="mt-4 text-gray-400">
        Jaise: "What if mai time travel kar pau?"
      </p>
    </div>
  );
};

export default Homepage;