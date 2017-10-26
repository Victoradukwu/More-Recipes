import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const recipeRoute = router.recipe;
const reviewRoute = router.review;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(recipeRoute);
app.use(reviewRoute);

app.all('*', (req, res) => res.status(404).send({
  message: 'Does not match any page',
}));

export default app;
