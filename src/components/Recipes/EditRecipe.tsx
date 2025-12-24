import { useContext } from "react";
// @ts-ignore
import styles from "./RecipesList.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import RecipeContext from "../../store/recipe-context";
import Inputs from "./Inputs";
import AddImageFile from "./AddImageFile";
import useRecipe from "../../hooks/use-recipe";
import ErrorModal from "../UI/ErrorModal";

const EditRecipe: React.FC<{
  index: number;
  setIsEdit: (isEdit: boolean) => void;
}> = (props) => {
  const { index, setIsEdit } = props;
  const recipeCtx = useContext(RecipeContext);
  const existingRecipe = { ...recipeCtx.recipesList[index] };

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
  } = useRecipe(existingRecipe, index);

  const saveEditHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
        <form onSubmit={saveEditHandler}>
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
          <Button type="submit">Save</Button>
        </form>
      </Card>
    </>
  );
};

export default EditRecipe;
