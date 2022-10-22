import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {
  //states for plant properties
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  function handleChange(event){
    const name = event.target.name;
    const value = event.target.value;

    switch (name){
      case "name":
        setName(value);
        break;
      case "image":
        setImage(value);
        break;
      case "price":
        setPrice(parseFloat(value));
        break;
      default:
        break;
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    const newPlant = {
      name,
      image,
      price
    }
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(newPlant => onAddPlant(newPlant))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
