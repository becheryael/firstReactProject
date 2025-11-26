import react from "react";
import Card from "../UI/Card";
import styles from "./RecipesList.module.css";

const Recipe = (props) => {
  const { recipe } = props;

  return (
    <Card classname={styles.recipes}>
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
      {recipe.image && (
        <img src={URL.createObjectURL(recipe.image)} alt="image not found" />
      )}
    </Card>
  );
};

export default Recipe;
