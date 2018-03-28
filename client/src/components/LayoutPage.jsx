import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './recipes/HomePage.jsx';
import connectedManageRecipePage from './recipes/ManageRecipePage.jsx';
import SignUpPage from './users/SignupPage.jsx';
import SignInPage from './users/SigninPage.jsx';
import UserProfile from './users/UserProfile.jsx';
import SignOutPage from './users/SignOutPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './Navbar';
import RecipeDetailsPage from './recipes/recipeDetails/RecipeDetailsPage.jsx';
import RecipeSearchPage from './recipes/RecipeSearchPage';
import UserRecipesPage from './recipes/UserRecipesPage';
import UserFavoritesPage from './recipes/UserFavoritesPage';


const LayoutPage = () => (
  <div className="body">
    <Navbar />
    <main className="main" style={{ paddingTop: '80px' }}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/favorites" component={UserFavoritesPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signout" component={SignOutPage} />
        <Route path="/user" component={UserProfile} />
        <Route path="/recipe/:id" component={connectedManageRecipePage} />
        <Route path="/recipe" exact component={connectedManageRecipePage} />
        <Route path="/myRecipes" component={UserRecipesPage} />
        <Route path="/recipeDetail/:id" component={RecipeDetailsPage} />
        <Route path="/recipeSearch" component={RecipeSearchPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>
    <footer className="footer text-center">
      <p>&copy; More-Recipes {(new Date()).getFullYear()}</p>
      <div>
        <span className="fa fa-envelope">: more_recipes@andela.com</span>
        &nbsp; &nbsp;
        <span className="fa fa-phone">: +2348012345678</span>
      </div>
    </footer>
  </div>
);


export default LayoutPage;
