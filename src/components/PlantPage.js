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

  let visiblePlants = plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()));

  function addNewPlant(newPlant){
    const updatedPlants = [...plants, newPlant];
    setPlants(updatedPlants);
  }

  function handleUpdatePlant(updatedPlant){
    const updatedPlants = plants.map(plant => {
      if(plant.id === updatedPlant.id){
        return updatedPlant;
      }
      else {
        return plant;
      }
    });
    setPlants(updatedPlants);
  }

  function handleDeletePlant(deletedPlant){
    const updatedPlants = plants.filter(plant => plant.id !== deletedPlant.id);
    setPlants(updatedPlants);
  }


  return (
    <main>
      <NewPlantForm onAddPlant={addNewPlant}/>
      <Search onSearch={setSearch}/>
      <PlantList plants={visiblePlants} onUpdatePlant={handleUpdatePlant} onDeletePlant={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
