import React, {useState} from "react";

function PlantCard({plant, onUpdatePlant}) {
    //destructure plant object
    const {id, name, image, price} = plant;

  //in stock state
  const [inStock, setInStock] = useState(true);
  const [newPrice, setNewPrice] = useState(price);


  function toggleInStock(){
    setInStock(prevState => !prevState);
  }

  function handlePriceChange(event){
    setNewPrice(event.target.value);
  }

  function handlePriceChangeSubmit(event){
    event.preventDefault();
    //patch request
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price: parseFloat(newPrice)
      })
    })
      .then(res => res.json())
      .then(updatedPlant => onUpdatePlant(updatedPlant))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <form onSubmit={handlePriceChangeSubmit}>
      <label>New price
      <input type="number" name="price" step="0.01" value={newPrice} onChange={handlePriceChange}/>
      </label>
      <button type="submit">Set</button>
      </form>
      {inStock? (
        <button className="primary" onClick={toggleInStock}>In Stock</button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
