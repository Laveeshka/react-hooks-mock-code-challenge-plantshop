import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onUpdatePlant}) {
  const plantCards = plants.map(plant => (<PlantCard key={plant.id} plant={plant} onUpdatePlant={onUpdatePlant}/>))
  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
