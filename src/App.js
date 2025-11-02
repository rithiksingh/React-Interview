import { useState } from "react";
import "./styles.css";
import "./recipesData.js";
import { createLogicalAnd } from "typescript";

export default function App() {
  const [cart, setCart] = useState(0);
  const list = recipesData;
  const [recipes, setRecipes] = useState(list);

  function handleClick(e) {
    const rating = e.target.value;
    const filteredCart = list.filter((recipe) => {
      return recipe.rating >= rating;
    });
    setRecipes(filteredCart);
  }

  function getAverageRating(list) {
    if (list.length === 0) return 0;
    const total = list.reduce((sum, recipe) => sum + recipe.rating, 0);
    return (total / list.length).toFixed(2);
  }

  const totalItems = recipes.length;
  const avgRating = getAverageRating(recipes);

  return (
    <div className="App">
      <div>
        <h1>🍽️ Recipe Explorer</h1>
      </div>
      <div className="top-container">
        <div>
          <label htmlFor="myDropdown">Filter by rating: </label>
          <select
            onChange={(e) => handleClick(e)}
            name="myDropdown"
            id="myDropdown"
          >
            <option value={4}>4.0 +</option>
            <option value={4.3}>4.3 +</option>
            <option value={4.5}>4.5 +</option>
            <option value={4.7}>4.7 +</option>
            <option value={4.9}>4.9 +</option>
          </select>
        </div>
        <h3>cart items: {cart}</h3>
      </div>

      <div className="avg container">
        <h1>
          Average Rating: {avgRating} ({totalItems} items)
        </h1>
      </div>
      <div className="card-container">
        {recipes.map((recipe) => {
          return (
            <>
              <div key={recipe.id} className="card">
                <img src={recipe.image} alt="" />
                <h2>{recipe.name}</h2>
                <p>Cuisine: {recipe.cuisine}</p>
                <p>
                  Rating: {recipe.rating} ({recipe.reviewCount} reviews)
                </p>
                <button onClick={() => setCart(cart + 1)}>Add to cart</button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
