import express from 'express';
import auth from '../middlewares/auth';
import { validRecipe, isFavorited, isValidFavorite } from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites, deleteFavorite } from '../controllers/favorite';

const router = express.Router();

router.post('/api/v1/users/:recipeId/favorites', auth, validRecipe, isFavorited, addFavorite);
router.delete('/api/v1/users/:recipeId/favorites', auth, isValidFavorite, deleteFavorite);
router.get('/api/v1/users/recipes/favorites', auth, getUserFavorites);

export default router;

