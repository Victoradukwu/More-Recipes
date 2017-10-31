import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const userRoute = router.user;
const recipeRoute = router.recipe;
const reviewRoute = router.review;
const favoriteRoute = router.favorite;


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('template'));

app.use(userRoute);
app.use(recipeRoute);
app.use(favoriteRoute);
app.use(reviewRoute);


app.get('/api', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Status connected ok',
  });
});

app.all('*', (req, res) => res.status(404).send({
  message: 'Page does not exist',
}));

export default app;
