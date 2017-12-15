import express from 'express';
import auth from '../middlewares/auth';
import validate from '../middlewares/validateParams';
import { createReview, updateReview, deleteReview } from '../controllers/review';
import { reviewBasicValidation, reviewExists, confirmReviewOwner } from '../middlewares/reviewValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/recipes/:recipeId/review', auth, validUser, reviewBasicValidation, createReview);
router.put('/api/v1/reviews/:reviewId', auth, validUser, reviewExists, confirmReviewOwner, updateReview);
router.delete('/api/v1/reviews/:reviewId', auth, validate, validUser, reviewExists, confirmReviewOwner, deleteReview);

export default router;
