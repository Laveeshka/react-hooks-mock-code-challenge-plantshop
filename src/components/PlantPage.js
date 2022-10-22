import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //lift state to this level
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

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

  const visiblePlants = plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <NewPlantForm onAddPlant={addNewPlant}/>
      <Search onSearch={setSearch}/>
      <PlantList plants={visiblePlants}/>
    </main>
  );
}

export default PlantPage;
