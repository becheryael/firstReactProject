import { useState, useContext, useEffect } from "react";
import RecipeContext from "../store/recipe-context";

const useRecipe = (initialRecipe = null) => {
  const recipeCtx = useContext(RecipeContext);

  const [recipeName, setRecipeName] = useState(initialRecipe?.recipeName || "");
  const [ingredientsList, setIngredientsList] = useState(initialRecipe?.ingredientsList || [""]);
  const [instructionsList, setInstructionsList] = useState(initialRecipe?.instructionsList || [""]);
  const [image, setImage] = useState(initialRecipe?.image || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [error]);

  const submitRecipeHandler = (event) => {
    event.preventDefault();

    if (recipeName.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a name for your recipe"
      });
      return false;
    } else if (ingredientsList[0] === "" || instructionsList[0] === "") {
      setError({
        title: "Invalid input",
        message:
          "A recipe must have at least one ingredient and instruction. Otherwise, what will you cook with!!!!! AAHHHAHAHAHHAH"
      });
      return false;
    }

    const newIngredientsList = ingredientsList.slice(0, -1);
    const newInstructionsList = instructionsList.slice(0, -1);

    if (!initialRecipe) {
      recipeCtx.onAddRecipe(
        recipeName,
        newIngredientsList,
        newInstructionsList,
        image
      );
      setRecipeName("");
      setIngredientsList([""]);
      setInstructionsList([""]);
      setImage(null);
    } else {
      recipeCtx.onEditRecipe(
        initialRecipe.index,
        recipeName,
        newIngredientsList,
        newInstructionsList,
        image
      );
    }
    return true;
  };

  const errorHandler = () => {
    setError(null);
  };

  return {
    recipeName,
    setRecipeName,
    ingredientsList,
    setIngredientsList,
    instructionsList,
    setInstructionsList,
    image,
    setImage,
    submitRecipeHandler,
    error,
    errorHandler
  };
};

export default useRecipe;
