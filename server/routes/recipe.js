import express from 'express';
// import { create, update, deleteRecipe, getRecipes, searchRecipesByIngredients, getUserRecipes, viewRecipe, getTopRecipes, searchRecipesByCategory, searchUserFavsByCategory } from '../controllers/recipe';

const router = express.Router();

let recipes = [
  {
    id: 1,
    recipeName: 'Chicken splash',
    ingredients: 'water, salt, oil, chicken',
    instruction: 'Boil water for 20 min and add chicken',
    upvote: 98,
    review: 'wonderful!',
  },
];

router.post('/api/recipes', (req, res) => {
  const item = req.body;
  if (!item.id) {
    return res.sendStatus(500);
  }
  recipes.push(item);
  res.status(201).send(`${recipes.recipeName} created`);
});

router.get('/api/recipes', (req, res) => {
  res.status(200).send(recipes);
});

router.put('/api/v1/recipes/:recipeId', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const existingItem = recipes.filter(r => r.id === id)[0];
  existingItem.recipeName = req.body.recipeName || existingItem.recipeName;
  existingItem.ingredients = req.body.ingredients || existingItem.ingredients;
  existingItem.instruction = req.body.instruction || existingItem.instruction;
  existingItem.upvote = req.body.upvote || existingItem.upvote;
  existingItem.review = req.body.review || existingItem.review;

  res.status(204).send(`recipe with id ${id} successfully edited.`);
});

router.delete('/api/v1/recipes/:recipeId', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const existingItem = recipes.filter(r => r.id === id)[0];

  if (!existingItem) {
    return res.status(404).send({ Message: 'this recipe does not exist.' });
  }
  recipes = recipes.filter(r => r.id !== id);
  res.status(204).send({ Message: 'successfully deleted.' });
});

export default router;
