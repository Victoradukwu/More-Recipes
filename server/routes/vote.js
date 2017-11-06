import express from 'express';
import auth from '../middlewares/auth';
import { upvote, downvote, getVotes } from '../controllers/vote';
import { recipeExists } from '../middlewares/recipeValidation';
import voteExists from '../middlewares/voteValidation';

const router = express.Router();

router.post('/api/v1/votes/:recipeId/upvote', auth, recipeExists, voteExists, upvote);
router.post('/api/v1/votes/:recipeId/downvote', auth, recipeExists, voteExists, downvote);
router.get('/api/v1/votes', auth, getVotes);

export default router;
