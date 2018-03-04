import express from 'express';
import auth from '../middlewares/auth';
import { validRecipe, isFavorited } from '../middlewares/favoriteValidation';
import { addFavorite, getUserFavorites } from '../controllers/favorite';
import validateEligibility from '../middlewares/validateEligibility';

const router = express.Router();

router.post(
  '/api/v1/users/:recipeId/favorites', auth, validRecipe,
  isFavorited, validateEligibility, addFavorite
);
router.get('/api/v1/users/favorites', auth, getUserFavorites);

export default router;

