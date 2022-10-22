import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //lift state to this level
  const [plants, setPlants] = useState([]);

  //fetch all plants on mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(res => res.json())
      .then(plantData => setPlants(plantData))
      .catch(err => console.warn(err.message))
  }, [])

  function addNewPlant(newPlant){
    const updatedPlants = [...plants, newPlant];
    setPlants(updatedPlants);
  }

  return (
    <main>
      <NewPlantForm onAddPlant={addNewPlant}/>
      <Search />
      <PlantList plants={plants}/>
    </main>
  );
}

export default PlantPage;
