class RecipeType {
  recipeName: string;
  ingredientsList: string[];
  instructionsList: string[];
  image: string | undefined;

  constructor(
    recipeName: string,
    ingredientsList: string[],
    instructionsList: string[],
    image: string | undefined
  ) {
    this.recipeName = recipeName;
    this.ingredientsList = ingredientsList;
    this.instructionsList = instructionsList;
    this.image = image;
  }
}

export default RecipeType;
