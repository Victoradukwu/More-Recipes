[![Build Status](https://travis-ci.org/Victoradukwu/More-Recipes.svg?branch=develop)](https://travis-ci.org/Victoradukwu/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/Victoradukwu/More-Recipes/badge.svg?branch=coveralls-config)](https://coveralls.io/github/Victoradukwu/More-Recipes?branch=coveralls-config)
# More-Recipes
## Introduction
**More-Recipes** is an application devoted to enhacing sharing of users' experience in the area of cooking. Users can view recipes submitted by other users. They can like, unlike, review and favorite such recipes. They can also submit their own recipes.

## Key Application features  
* Authenticated sers can create account and log in
* Authenticated users can view recipes submitted by other users
* Authenticated uses can vieww details of a recipes in the catalog
* Authenticated user can edit and delete a recipe he submitted
* Authenticated user can add a recipe as his favourite
* Authenticated user can view a list of his favorite recipes
* Authenticated user can manage his profile
* Authenticated user can log out
* Authenticated user can upvote or downvote a recipe
* Authenticated user can review a recipe and see other users' reviews

## Technologies used
* NodeJS
* Postgres DBMS
* Sequelize ORM
* Bootsrap
* Express web framework
* JSON Web Token
* Bcrypt

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
> babel-watch ./bin/www
> Server listening on port 8000
```
## Application API rotes
PUT `api/v1/users/changepassword` changing password of an existing user. 

* POST `api/v1/recipes` for adding a new recipe.
  
* GET `api/v1/recipes` for viewing all recipes in the catalog

* GET `api/v1/recipes?sort=upvote&order=descending` for retrieving votes in dectreasing order of upvotes

* PUT `api/v1/recipes/<recipeId>` for editing a recipe by a user who has posted it.

* DELETE `api/v1/recipes/<recipeId>` to delete a posted recipe posted by the logged in user

* PUT `api/v1/recipes/<recipeId>/upvote` to upvote a recipe.

* PUT `api/v1/recipes/<recipeId>/downvote` to downvote a recipe.

* POST `api/v1/recipes/<recipeId>/reviews` for adding a review for a recipe.

* POST `api/v1/users/<recipeId>/favorites` for adding a recipe to a list of user's favorite.

* DELETE `api/v1/users/<recipeId>/favorites` for removing a recipe on a user's favorite list.

* GET `api/v1/users/recipes/favorites` for viewing all the recipes in a user's favorite list.

## Testing
* Create a test database and name it Testdb
* Run Test `$ npm test`

## How To Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write your code and the passing testss
* Open a pull request

