import express from 'express';
import auth from '../middlewares/auth';
import { upvote, downvote, getVotes } from '../controllers/vote';
import { recipeExists } from '../middlewares/recipeValidation';
import voteExists from '../middlewares/voteValidation';
import validateEligibility from '../middlewares/validateEligibility';

const router = express.Router();

router.post('/api/v1/votes/:recipeId/upvote', auth, recipeExists, voteExists, validateEligibility, upvote);
router.post('/api/v1/votes/:recipeId/downvote', auth, recipeExists, voteExists, validateEligibility, downvote);
router.get('/api/v1/votes', auth, getVotes);

export default router;
