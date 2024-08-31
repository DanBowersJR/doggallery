// App.js
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Button from "./components/Button";
import BreedSelector from "./components/BreedSelector";
import ImageGallery from "./components/ImageGallery";
import Footer from "./components/Footer";

// Main functional component for the Dog Image Gallery App
function App() {
  // State management for breed selection, image URLs, and number of images
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogImageLinks, setImageUrls] = useState([]);
  const [numImages, setNumImages] = useState(1);

  // Handles change in number of images chosen by the user
  const handleNumImagesChange = (e) => {
    setNumImages(Number(e.target.value));
  };

  // Updates the selected breed state
  const handleBreedChange = (breed) => {
    setSelectedBreed(breed);
  };

  // Fetch dog images determined by breed and number selection
  const handleGenerateClick = async () => {
    if (selectedBreed) {
      try {
        const responses = await Promise.all(
          Array.from({ length: numImages }, () =>
            fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
          )
        );
        const data = await Promise.all(
          responses.map((response) => response.json())
        );
        setImageUrls(data.map((item) => item.message));
      } catch (error) {
        console.error("Error fetching images", error);
      }
    } else {
      alert("Select a breed to begin");
    }
  };

  // UI components for selecting and displaying dog images
  return (
    <div className="app-container">
      <div className="header-container">
        <Header
          title="Dog Image Gallery"
          text="Choose a Breed and Set the Number of Images to Explore!"
        />
        <BreedSelector onBreedChange={handleBreedChange} />
        <label htmlFor="numImages">Select Number: </label>
        <select
          id="numImages"
          value={numImages}
          onChange={handleNumImagesChange}
        >
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <Button onClick={handleGenerateClick} text="Preview" />
      </div>
      <ImageGallery dogImageLinks={dogImageLinks} />
      <Footer />
    </div>
  );
}

export default App;
