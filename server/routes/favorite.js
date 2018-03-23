import express from 'express';
import auth from '../middlewares/auth';
import { validRecipe, isFavorited } from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites, isUserFavorite } from '../controllers/favorite';
import validateEligibility from '../middlewares/validateEligibility';

const router = express.Router();

router.post(
  '/api/v1/users/:recipeId/favorites', auth, validRecipe,
  isFavorited, validateEligibility, addFavorite
);
router.get('/api/v1/users/favorites', auth, getUserFavorites);

router.get('/api/v1/users/:recipeId/favorites', auth, isUserFavorite);

export default router;

