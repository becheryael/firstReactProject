import { useContext } from "react";
import styles from "./RecipesList.module.css";
import RecipeContext from "../../store/recipe-context";
import Recipe from "./Recipe";

const RecipesList = () => {
  
  const recipeCtx = useContext(RecipeContext);

  return (
    <div className={styles.recipeCards}>
      {recipeCtx.recipesList.map((recipe, index) => (
        <Recipe recipe={recipe} index={index} key={index}/>
      ))}
    </div>
  );
};

export default RecipesList;
