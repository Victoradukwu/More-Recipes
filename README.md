# More-Recipes
[![Build Status](https://travis-ci.org/Victoradukwu/More-Recipes.svg?branch=develop)](https://travis-ci.org/Victoradukwu/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/Victoradukwu/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/Victoradukwu/More-Recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/87acc34bde92d0d7a519/maintainability)](https://codeclimate.com/github/Victoradukwu/More-Recipes/maintainability)
## Introduction
**More-Recipes** is an application devoted to enhacing sharing of users' experience in the area of cooking. Registered users can view recipes submitted by other users. They can like, unlike, review and favorite such recipes. In addition, registered users can submit recipes and are able to edit and delete their own recipes.

## __Heroku Link__
https://victor-more-recipes.herokuapp.com/

## Key Application features  
* Users can create account and log in
* Users can view recipes submitted by other users
* Authenticated uses can vieww details of a recipes in the catalog
* Authenticated user can edit and delete a recipe he submitted
* Authenticated user can add a recipe as his favourite
* Authenticated user can view a list of his favorite recipes
* Authenticated user can manage his profile
* Authenticated user can log out
* Authenticated user can upvote or downvote a recipe
* Authenticated user can review a recipe and see other users' reviews

## Technologies used
* <a href = "https://nodejs.org/">NodeJS</a> A Javascript runtime for serverside development
* <a href ="https://www.postgresql.org/">Postgres DBMS: </a> An open-source RDBMS for storint data
* <a href ="http://docs.sequelizejs.com/">Sequelize ORM: </a>A javaScript-base ORM for mapping JS oject to DB tables.
* <a href ="https://getbootstrap.com/">Bootsrap: </a>Afree and open-source front-end web framework for designing websites and web applications.
* <a href = "https://expressjs.com/">Express web framework: </a> A NodeJS web application framework
* <a href ="https://jwt.io/">JSON Web Token: </a> A JSON-based standard for creating access tokens.
* <a href ="https://www.npmjs.com/package/bcrypt">Bcrypt: </a> A function for hashing password.
* <a href ="https://reactjs.org/">React: </a> A JavaScript library for buiding application user interfaces.
* <a href ="https://redux.js.org/">Redux: </a> An open-source JavaScript library form managing application state.

## Installing the application 
* Install NodeJS  and Postgres on your local system
* Clone the application to your local system
```Sh
> $ `git clone https://github.com/Victoradukwu/More-Recipes.git`
```
* Change the directory on your local system
```Sh
> $ `cd /More-recipes`
```
* Install all dependencies
```Sh
> $ `npm install`
```
* create a .env file at you app root and populate it withb the encironment variables such as:
```Sh
DB_USERNAME = your database username
DB_PASSWORD = your database password
DB_DATABASE = your database name
DB_HOST = "127.0.0.1"
DB_PORT = "5432"
DB_DIALECT = "postgres"
secretKey = your secret key
jwtid = your jwt id
expiresIn = jwt expiration e.g "72h"
```
* Migrate the application
```Sh
> $ `sequelize db:migrate`
```
* Start the application
```sh
> $ npm start
```
## Application API routes
* POST `api/v1/users/signup` for registering a user.

* POST `api/v1/users/signin` for authenticating a registered user.

* PUT `api/v1/users/changepassword` changing password of an existing user. 

* POST `api/v1/users/<recipeId>/favorites` for adding a recipe to a list of user's favorite.

* GET `api/v1/users/favorites` for viewing all the recipes in a user's favorite list.

* GET `api/v1/users/recipes` for retrieveing all the recipes of the logged in user.

* POST `api/v1/recipes` for adding a new recipe.
  
* GET `api/v1/recipes` for viewing all recipes in the catalog

* GET `api/v1/recipes?sort=upvote&order=descending` for retrieving votes in decreasing order of upvotes

* PUT `api/v1/recipes/<recipeId>` for editing a recipe by a user who has posted it.

* DELETE `api/v1/recipes/<recipeId>` to delete a recipe posted by the logged in user

* PUT `api/v1/recipes/<recipeId>/upvote` to upvote a recipe.

* PUT `api/v1/recipes/<recipeId>/downvote` to downvote a recipe.

* POST `api/v1/recipes/<recipeId>/reviews` for adding a review for a recipe.

## Testing
* Create a test database and name it `Testdb`
* Run Test `$ npm test`

## FAQ
__Can I have mulitiple user account?__
There is only one account per user email
__How many recipes can I submit?__
There is no limit to the number of recipes you can submit
__How do I recover an accidentally deleted recipe?__
Deleting a recipe is irrversible. Be sure before you confirm delete action
__I am at the application landing page but no link to add recipe__
You have to sign in (or sign up if you are new) to be able to add recipe

## Application Limitation
1.  Right now, you can only have one image per recipe
2.  Once you register, you username and email can not be changed
3. The application is only accessible via the web. No native versions yet.

## How To Contribute
* Fork the repository
* Create a feature branch
* Write your code and the passing testss
* Open a pull request

