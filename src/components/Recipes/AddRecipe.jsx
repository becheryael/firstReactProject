import React, { useState } from "react";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import styles from "../Recipes/AddRecipes.module.css";
import AddImageFile from "./AddImageFile";
import Input from "./InputControl";

const AddRecipe = (props) => {
  const [enteredRecipeName, setEnteredRecipeName] = useState("");
  const [ingredientsList, setIngredientsList] = useState([""]);
  const [instructionsList, setInstructionsList] = useState([""]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState();

  const addRecipeHandler = (event) => {
    event.preventDefault();

    if (enteredRecipeName.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a name for your recipe",
      });
      return;
    } else if (ingredientsList[0] === "" || instructionsList[0] === "") {
      setError({
        title: "Invalid input",
        message:
          "A recipe must have at least one ingredient and instruction. Otherwise, what will you cook with!!!!! AAHHHAHAHAHHAH",
      });
      return;
    }

    ingredientsList.pop();
    instructionsList.pop();

    props.onAddRecipe(
      enteredRecipeName,
      ingredientsList,
      instructionsList,
      image
    );
    setEnteredRecipeName("");
    setIngredientsList([""]);
    setInstructionsList([""]);
    setImage(null);
  };

  const errorHandler = () => {
    setError(null);
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
      <Card classname={styles.input}>
        <form onSubmit={addRecipeHandler} className={styles.form}>
          <label htmlFor="recipe name">Recipe Name</label>
          <input
            id="recipe-name"
            type="text"
            value={enteredRecipeName}
            onChange={(event) => setEnteredRecipeName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          />
          <Input
            title="Ingredients"
            list={ingredientsList}
            setList={setIngredientsList}
          />
          <Input
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
