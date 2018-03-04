import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { createReview, updateReview, deleteReview }
  from '../controllers/review';
import { reviewBasicValidation, reviewExists, confirmReviewOwner }
  from '../middlewares/reviewValidation';
import { validRecipe } from '../middlewares/favoriteValidation';

const router = express.Router();

router.post(
  '/api/v1/recipes/:recipeId/review',
  auth, reviewBasicValidation, validRecipe, createReview
);
router.put(
  '/api/v1/reviews/:reviewId',
  auth, reviewExists, confirmReviewOwner, updateReview
);
router.delete(
  '/api/v1/reviews/:reviewId',
  auth, validate, reviewExists, confirmReviewOwner, deleteReview
);

export default router;
