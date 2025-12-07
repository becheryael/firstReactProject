import { useContext } from "react";
import styles from "./RecipesList.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import RecipeContext from "../../store/recipe-context";
import Inputs from "./Inputs";
import AddImageFile from "./AddImageFile";
import useRecipe from "../../hooks/use-recipe";
import ErrorModal from "../UI/ErrorModal";

const EditRecipe = (props) => {
  const { index, setIsEdit } = props;
  const recipeCtx = useContext(RecipeContext);
  const existingRecipe = { index, ...recipeCtx.recipesList[index] };

  const {
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
  } = useRecipe(existingRecipe);

  const saveEditHandler = (event) => {
    const success = submitRecipeHandler(event);
    if (success) {
      setIsEdit(false);
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card classname={styles.recipes}>
        <input
          onChange={(event) => setRecipeName(event.target.value)}
          value={recipeName}
        />
        <Inputs
          title="Ingredients:"
          list={ingredientsList}
          setList={setIngredientsList}
        />
        <Inputs
          title="Instructions:"
          list={instructionsList}
          setList={setInstructionsList}
        />
        <AddImageFile image={image} setImage={setImage} />
        <Button type="submit" onClick={saveEditHandler}>
          Save
        </Button>
      </Card>
    </>
  );
};

export default EditRecipe;
