import React, { useReducer, useEffect } from "react";

const INITIAL_RECIPES_LIST = [];

const RecipeContext = React.createContext({
  recipesList: [],
  onAddRecipe: (recipeName, ingredientsList, instructionsList, image) => {},
  onDeleteRecipe: (index) => {},
  onEditRecipe: (index, recipeName, ingredientsList, instructionsList, image) => {}
});

const getStoredRecipes = () => {
  const storedRecipes = sessionStorage.getItem("recipesList");
  if (!storedRecipes) {
    return INITIAL_RECIPES_LIST;
  }
  return JSON.parse(storedRecipes);
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [...state, action.payload];
    case "DELETE_RECIPE":
      const newRecipesList = state.filter(
        (recipe, index) => index !== action.payload
      );
      return newRecipesList;
    case "EDIT_RECIPE":
      const { index, recipeName, ingredientsList, instructionsList, image } = action.payload;
      
      return state.map((recipe, i) => {
        if (i === index) {
          return {
            recipeName,
            ingredientsList,
            instructionsList,
            image
          };
        }
        return recipe;
      });
    default:
      return state;
  }
};

export const RecipeContextProvider = (props) => {
  const [recipesState, dispatchRecipe] = useReducer(
    recipeReducer,
    INITIAL_RECIPES_LIST,
    getStoredRecipes
  );

  useEffect(() => {
    sessionStorage.setItem("recipesList", JSON.stringify(recipesState));
  }, [recipesState]);

  const addRecipeHandler = (
    recipeName,
    ingredientsList,
    instructionsList,
    image
  ) => {
    dispatchRecipe({
      type: "ADD_RECIPE",
      payload: { recipeName, ingredientsList, instructionsList, image }
    });
  };

  const removeRecipeHandler = (index) => {
    dispatchRecipe({
      type: "DELETE_RECIPE",
      payload: index
    });
  };

  const editRecipeHandler = (
    index,
    recipeName,
    ingredientsList,
    instructionsList,
    image
  ) => {
    dispatchRecipe({
      type: "EDIT_RECIPE",
      payload: { index, recipeName, ingredientsList, instructionsList, image }
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipesList: recipesState,
        onAddRecipe: addRecipeHandler,
        onDeleteRecipe: removeRecipeHandler,
        onEditRecipe: editRecipeHandler
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
