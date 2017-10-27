import express from 'express';

const router = express.Router();

let recipes = [
  {
    recipeId: 1,
    recipeName: 'Chicken splash',
    ingredients: 'water, salt, oil, chicken',
    instruction: 'Boil water for 20 min and add chicken',
    upvote: 98,
  },
  {
    recipeId: 2,
    recipeName: 'Vegie man',
    ingredients: 'spinarch, pumpkin, lettuce',
    instruction: 'Boil, mash and filter',
    upvote: 36,
  },
  {
    recipeId: 3,
    recipeName: 'Fruttie Froth',
    ingredients: 'almon, guava, mango',
    instruction: 'Pound and refrigrate',
    upvote: 157,
  },
];

router.post('/api/recipes', (req, res) => {
  const item = req.body;
  if (!item.recipeId) {
    return res.sendStatus(500);
  }
  recipes.push(item);
  res.status(201).send('successfully created');
});

router.get('/api/recipes', (req, res) => {
  if(!req.query.sort) {
    res.status(200).send(recipes);
  } else {
    const results = recipes.sort((a, b) => (b.upvote - a.upvote));
    res.status(200).send(results);   
  }
});

router.get('api/recipe/', (req, res) => {
  if (req.query.sort) {
    const results = recipes.sort((a, b) => (b.upvote - a.upvote));
    res.status(200).send(results);
  }
});

router.put('/api/recipes/:recipeId', (req, res) => {
  const id = parseInt(req.params.recipeId, 10);
  for (let i = 0; i < recipes.length; i += 1) {
    if (recipes[i].recipeId === id) {
      recipes[i].recipeName = req.body.recipeName || recipes[i].recipeName;
      recipes[i].ingredients = req.body.ingredients || recipes[i].ingredients;
      recipes[i].instruction = req.body.instruction || recipes[i].instruction;
      recipes[i].upvote = req.body.upvote || recipes[i].upvote;
      res.status(204).send('recipe successfully edited.');
    }
  }
  res.status(404).json({ Message: 'recipe not found' });
});

router.delete('/api/recipes/:recipeId', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = recipes.filter(r => r.id === id)[0];

  if (!item) {
    return res.sendStatus(404);
  }

  recipes = recipes.filter(r => r.id !== id);
  res.sendStatus(204);
});

export default router;
