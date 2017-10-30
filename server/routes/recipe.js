import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { createRecipe, updateRecipe, deleteRecipe, getRecipes, getUserRecipes, viewRecipe, getTopRecipes } from '../controllers/recipe';
import { recipeBasicValidation, recipeExists } from '../middlewares/recipeValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes', auth, validUser, recipeBasicValidation, createRecipe);
router.get('/api/v1/recipes', auth, validUser, getRecipes, getTopRecipes);
router.get('/api/v1/recipes/user', auth, validUser, getUserRecipes);
router.put('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, updateRecipe);
router.get('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, viewRecipe);
router.delete('/api/v1/recipes/:recipeId', auth, validate, validUser, recipeExists, deleteRecipe);

export default router;
