import express from 'express';

const router = express.Router();

const reviews = [
  {
    reviewId: 1,
    recipeId: 12,
    userId: 3,
    comment: 'Awesome recipe',
  },
];

router.post('/api/recipes/:recipeId/reviews', (req, res) => {
  if (!req.params.recipeId) {
    res.sendStatus(500);
  }
  const item = {
    reviewId: parseInt(req.body.reviewId, 10),
    recipeId: parseInt(req.params.recipeId, 10),
    userId: parseInt(req.body.userId, 10),
    comment: req.body.comment,
  };
  reviews.push(item);
  res.status(201).send(item);
});

router.get('/api/reviews', (req, res) => {
  res.status(200).send(reviews);
});

export default router;
