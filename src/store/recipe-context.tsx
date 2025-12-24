import React, { useReducer, useEffect, PropsWithChildren } from "react";
import Recipe from "../models/Recipe";
const INITIAL_RECIPES_LIST: [] = [];

type RecipeContextObj = {
  recipesList: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (index: number) => void;
  onEditRecipe: (index: number, editedRecipe: Recipe) => void;
};

type Action =
  | { type: "ADD_RECIPE"; payload: Recipe }
  | { type: "DELETE_RECIPE"; payload: number }
  | { type: "EDIT_RECIPE"; payload: { index: number; editedRecipe: Recipe } };

const RecipeContext = React.createContext<RecipeContextObj>({
  recipesList: [],
  onAddRecipe: (recipe: Recipe) => {},
  onDeleteRecipe: (index: number) => {},
  onEditRecipe: (index: number, editedRecipe: Recipe) => {}
});

const getStoredRecipes = () => {
  const storedRecipes = sessionStorage.getItem("recipesList");
  if (!storedRecipes) {
    return INITIAL_RECIPES_LIST;
  }
  return JSON.parse(storedRecipes);
};

const recipeReducer = (state: Recipe[], action: Action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [...state, action.payload];
    case "DELETE_RECIPE":
      const newRecipesList = state.filter(
        (recipe: Recipe, index: number) => index !== action.payload
      );
      return newRecipesList;
    case "EDIT_RECIPE":
      const { index, editedRecipe } = action.payload;

      return state.map((prevRecipe: Recipe, i: number) => {
        if (i === index) {
          return editedRecipe;
        }
        return prevRecipe;
      });
    default:
      return state;
  }
};

export const RecipeContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [recipesState, dispatchRecipe] = useReducer(
    recipeReducer,
    INITIAL_RECIPES_LIST,
    getStoredRecipes
  );

  useEffect(() => {
    sessionStorage.setItem("recipesList", JSON.stringify(recipesState));
  }, [recipesState]);

  const addRecipeHandler = (recipe: Recipe) => {
    dispatchRecipe({
      type: "ADD_RECIPE",
      payload: recipe
    });
  };

  const removeRecipeHandler = (index: number) => {
    dispatchRecipe({
      type: "DELETE_RECIPE",
      payload: index
    });
  };

  const editRecipeHandler = (index: number, editedRecipe: Recipe) => {
    dispatchRecipe({
      type: "EDIT_RECIPE",
      payload: { index, editedRecipe }
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
