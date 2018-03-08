import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { createRecipe, updateRecipe, deleteRecipe, getUserRecipes,
  viewRecipe, getTopRecipes } from '../controllers/recipe';
import { recipeBasicValidation, recipeExists, confirmRecipeOwner }
  from '../middlewares/recipeValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, recipeBasicValidation, createRecipe);
router.get('/api/v1/recipes', getTopRecipes);
router.get('/api/v1/users/recipes', auth, getUserRecipes);
router.put(
  '/api/v1/recipes/:recipeId', auth, validate, recipeExists,
  confirmRecipeOwner, updateRecipe
);
router.get(
  '/api/v1/recipes/:recipeId', auth, validate,
  recipeExists, viewRecipe
);
router.delete(
  '/api/v1/recipes/:recipeId', auth, validate, recipeExists,
  confirmRecipeOwner, deleteRecipe
);

export default router;
