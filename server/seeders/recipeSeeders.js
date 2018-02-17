export default {
  createRecipe: {
    // res.body.message === "Please enter a recipe name"
    // res.statusCode === 406
    // res.body.status === 'fail'.
    nullrecipeName: {
      ingredients: 'js, react, redux',
      instructions: 'mix and boil'
    },

    // res.body.message === "Ingredients field cannot be empty"
    // res.statusCode === 406
    // res.body.status === 'fail'
    nullIngredients: {
      recipeName: 'myRecipe',
      instructions: 'mix and boil'
    },

    // res.body.message === "Instructions field cannot be empty"
    // res.statusCode === 406
    // res.body.status === 'fail'
    nullInstructions: {
      recipeName: 'myRecipe',
      ingredients: 'js, react, redux'
    },

    // res.body.message === "user successfully created"
    // res.statusCode === 201
    fullrecipeDetails: {
      recipeName: 'myRecipe',
      ingredients: 'js, react, redux',
      instructions: 'mix and boil'
    },
    fullrecipeDetails1: {
      recipeName: 'myRecipe1',
      ingredients: 'js, react, redux and more',
      instructions: 'mix and boil and more'
    },
    fullrecipeDetails2: {
      recipeName: 'myRecipe1',
      ingredients: 'js, react, redux and more',
      instructions: 'mix and boil and more'
    },


    // Object.message === "Invalid credentials supplied"
    // res.statusCode === 400
    emptyRequestData: {
    }
  }
};
