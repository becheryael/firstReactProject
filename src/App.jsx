import React, { useState } from "react";
import AddRecipe from "./components/Recipes/AddRecipe";
import RecipesList from "./components/Recipes/RecipesList";

const App = () => {
  const [recipesList, setRecipesList] = useState([]);

  const addRecipeHandler = (
    recipeName,
    ingredientsList,
    instructionsList,
    image
  ) => {
    setRecipesList((prevRecipeList) => {
      return [
        ...prevRecipeList,
        { recipeName, ingredientsList, instructionsList, image },
      ];
    });
  };

  return (
    <>
      <AddRecipe onAddRecipe={addRecipeHandler}></AddRecipe>
      <RecipesList recipes={recipesList}></RecipesList>
    </>
  );
};

export default App;
