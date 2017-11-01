import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { createRecipe, updateRecipe, deleteRecipe, getRecipes, getUserRecipes, viewRecipe, getTopRecipes } from '../controllers/recipe';
import { recipeBasicValidation, recipeExists, confirmRecipeOwner } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, recipeBasicValidation, createRecipe);
router.get('/api/v1/recipes', auth, validUser, getRecipes, getTopRecipes);
router.get('/api/v1/users/:userId/recipes', auth, validUser, getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, confirmRecipeOwner, updateRecipe);
router.get('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, confirmRecipeOwner, deleteRecipe);

export default router;
