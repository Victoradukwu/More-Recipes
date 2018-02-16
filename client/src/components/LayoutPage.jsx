import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import AboutPage from './recipes/AboutPage.jsx';
import HomePage from './recipes/HomePage.jsx';
import ManageRecipePage from './recipes/ManageRecipePage.jsx';
import SignUpPage from './users/SignupPage.jsx';
import SignInPage from './users/SigninPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import RecipeDetailsPage from './recipes/recipeDetails/RecipeDetailsPage.jsx';
import UserRecipesPage from './recipes/UserRecipesPage';


const LayoutPage = () => (
  <div className="primary-layout">
    <nav className="navbar sticky-top navbar-expand-md">
      <Link to="/" className="navbar-brand">More-Recipes</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse container-fluid" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/myRecipes">My Recipes</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Favourites</a>
          </li>
          <li className="nav-item">
            <Link to="/recipe" className="nav-link" >Add Recipe</Link>
          </li>
        </ul>
        <form className="form-inline" action="">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" />
          <button className="btn search" type="submit">Search</button>
        </form>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/signup">
              <span className="fa fa-sign-in fa-lg" />
                Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/recipe/:id" component={ManageRecipePage} />
        <Route path="/recipe" exact component={ManageRecipePage} />
        <Route path="/myRecipes" component={UserRecipesPage} />
        <Route path="/recipeDetail/:id" component={RecipeDetailsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>
    <footer className="fixed-bottom">
      <div style={{ display: 'inline-block', float: 'left' }}>
        <h6>Connect with us:</h6>
        <span className=" social fa fa-facebook" />
        <span className=" social fa fa-google-plus" />
        <span className=" social fa fa-instagram" />
      </div>
      <p style={{ dislay: 'inline-block', float: 'none' }}>&copy; More-Recipes 2018</p>
      <div style={{ display: 'inline-block', float: 'right', paddingRight: '40px' }}>
        <h6>Contact us:</h6>
        <span className="fa fa-envelope">: more_recipes@andela.com</span> &nbsp;
        <span className="fa fa-phone">: +2348012345678</span>
      </div>
    </footer>
  </div>
);
export default LayoutPage;
