import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import router from './server/routes/index';
import webpackConfig from './webpack.config';


const userRoute = router.user;
const recipeRoute = router.recipe;
const reviewRoute = router.review;
const favoriteRoute = router.favorite;
const voteRoute = router.vote;


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/src/public'));

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

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './client/src/public/index.html')));

export default app;
