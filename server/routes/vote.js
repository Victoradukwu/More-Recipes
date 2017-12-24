import express from 'express';
import auth from '../middlewares/auth';
import { upvote, downvote } from '../controllers/vote';
import { recipeExists } from '../middlewares/recipeValidation';
import voteExists from '../middlewares/voteValidation';
import validateEligibility from '../middlewares/validateEligibility';

const router = express.Router();

router.put('/api/v1/recipes/:recipeId/upvote', auth, recipeExists, voteExists, validateEligibility, upvote);
router.put('/api/v1/recipes/:recipeId/downvote', auth, recipeExists, voteExists, validateEligibility, downvote);

export default router;
