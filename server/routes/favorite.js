import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { validUser } from '../middlewares/userValidation';
import { validRecipe, isFavorited, isValidFavorite } from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites, deleteFavorite } from '../controllers/favorite';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, validate, validUser, validRecipe, isFavorited, addFavorite);
router.delete('/api/v1/users/:recipeId/favorites', auth, validate, validUser, validRecipe, isValidFavorite, deleteFavorite);
router.get('/api/v1/users/recipes/favorites', auth, validUser, getUserFavorites);

export default router;

