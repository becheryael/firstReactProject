import { useContext, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./RecipesList.module.css";
import RecipeContext from "../../store/recipe-context";
import EditRecipe from "./EditRecipe";

const Recipe = (props) => {
  const { recipe, index } = props;
  const recipeCtx = useContext(RecipeContext);

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      {!isEdit && (
        <Card classname={styles.recipes}>
          <h3>{recipeCtx.recipesList[index].recipeName}</h3>
          <h4>Ingredients:</h4>
          <ol>
            {recipeCtx.recipesList[index].ingredientsList.map(
              (ingredient, index) => (
                <li key={index}>{ingredient}</li>
              )
            )}
          </ol>
          <h4>Instructions:</h4>
          <ol>
            {recipeCtx.recipesList[index].instructionsList.map(
              (instruction, index) => (
                <li key={index}>{instruction}</li>
              )
            )}
          </ol>
          {recipe.image && (
            <img
              src={recipeCtx.recipesList[index].image}
              alt="image not found"
            />
          )}
          <Button
            type="button"
            onClick={recipeCtx.onDeleteRecipe.bind(null, index)}
          >
            Delete
          </Button>
          <Button type="button" onClick={handleEdit}>
            Edit
          </Button>
        </Card>
      )}
      {isEdit && (
        <EditRecipe recipe={recipe} index={index} setIsEdit={setIsEdit} />
      )}
    </>
  );
};

export default Recipe;
