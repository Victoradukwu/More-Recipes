import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/index';

const userRoute = router.user;
const recipeRoute = router.recipe;
const reviewRoute = router.review;
const favoriteRoute = router.favorite;
const voteRoute = router.vote;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoute);
app.use(recipeRoute);
app.use(favoriteRoute);
app.use(reviewRoute);
app.use(voteRoute);

app.get('/api', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Status connected ok',
  });
});

app.use('/', express.static('build'));
app.use('*', express.static('build'));

export default app;