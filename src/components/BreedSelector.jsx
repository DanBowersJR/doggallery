import React, { useState, useEffect } from "react";

// Component for selecting a dog breed from a dropdown list
const BreedSelector = ({ onBreedChange }) => {
  // State for storing list of breeds and the current selected breed
  const [breedsList, setBreedsList] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("");

  // Effect hook to fetch breed list from Dog CEO API on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        setBreedsList(Object.keys(data.message)); // Extract breed names from fetched data
      } catch (error) {
        console.error("Error fetching breeds", error);
      }
    };
    fetchBreeds();
  }, []);

  // Updates the currently selected breed and notifies parent component
  const handleBreedSelection = (event) => {
    const selectedBreed = event.target.value;
    setCurrentBreed(selectedBreed);
    if (typeof onBreedChange === "function") {
      onBreedChange(selectedBreed); // Triggers callback with new breed!
    }
  };

  // Render the breed selector UI
  return (
    <div className="breedSelect">
      <label htmlFor="breed-selector">Select a dog breed: </label>
      <select
        id="breed-selector"
        value={currentBreed}
        onChange={handleBreedSelection}
      >
        <option value="">---Options--</option>
        {breedsList.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedSelector;
