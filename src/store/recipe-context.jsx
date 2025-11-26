import React, { useState } from "react";

const RecipeContext = React.createContext({
  recipesList: [],
  onAddRecipe: (recipeName, ingredientsList, instructionsList, image) => {},
});

export const RecipeContextProvider = (props) => {
  
  const [recipesList, setRecipesList] = useState([]);

  const addRecipeHandler = (
    recipeName,
    ingredientsList,
    instructionsList,
    image
  ) => {
    setRecipesList((prevRecipesList) => {
      return [
        ...prevRecipesList,
        { recipeName, ingredientsList, instructionsList, image },
      ];
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipesList,
        onAddRecipe: addRecipeHandler,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
