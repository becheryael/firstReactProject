import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
// @ts-ignore
import styles from "../Recipes/AddRecipes.module.css";
import AddImageFile from "./AddImageFile";
import Inputs from "./Inputs";
import useRecipe from "../../hooks/use-recipe";

const AddRecipe = () => {
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
  } = useRecipe();

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card classname={styles.input}>
        <form onSubmit={submitRecipeHandler} className={styles.form}>
          <label htmlFor="recipe name">Recipe Name</label>
          <input
            id="recipe-name"
            type="text"
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          />
          <Inputs
            title="Ingredients"
            list={ingredientsList}
            setList={setIngredientsList}
          />
          <Inputs
            title="Instructions"
            list={instructionsList}
            setList={setInstructionsList}
          />
          <AddImageFile image={image} setImage={setImage} />

          <Button type="submit">Add Recipe</Button>
        </form>
      </Card>
    </>
  );
};

export default AddRecipe;
