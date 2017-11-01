import express from 'express';
import auth from '../middlewares/auth';
import { upvote, downvote } from '../controllers/vote';
import validate from '../middlewares/validateParams';
import { recipeExists } from '../middlewares/recipeValidation';
import { voteExists } from '../middlewares/voteValidation';
import { validUser } from '../middlewares/userValidation';

const router = express.Router();

router.post('/api/v1/votes/:recipeId/upvote', auth, validate, validUser, recipeExists, voteExists, upvote);
router.post('/api/v1/votes/:recipeId/downvote', auth, validate, validUser, recipeExists, voteExists, downvote);

export default router;
