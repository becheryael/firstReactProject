import react from "react";
import Card from "../UI/Card";
import styles from "./RecipesList.module.css";

const RecipesList = (props) => {
  return (
    <div className={styles.recipeCards}>
      {props.recipes.map((recipe, index) => (
        <Card classname={styles.recipes} key={index}>
          <h3>{recipe.recipeName}</h3>
          <h4>Ingredients:</h4>
          <ol>
            {recipe.ingredientsList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ol>
          <h4>Instructions:</h4>
          <ol>
            {recipe.instructionsList.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          {recipe.image && <img src={URL.createObjectURL(recipe.image)} />}
        </Card>
      ))}
    </div>
  );
};

export default RecipesList;
