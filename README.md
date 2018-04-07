# More-Recipes
[![Build Status](https://travis-ci.org/Victoradukwu/More-Recipes.svg?branch=develop)](https://travis-ci.org/Victoradukwu/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/Victoradukwu/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/Victoradukwu/More-Recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/87acc34bde92d0d7a519/maintainability)](https://codeclimate.com/github/Victoradukwu/More-Recipes/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Introduction
**More-Recipes** is an application devoted to enhacing sharing of users' experience in the area of cooking. Registered users can view recipes submitted by other users. They can like, unlike, review and favorite such recipes. In addition, registered users can submit recipes and are able to edit and delete their own recipes.

## __Application Link__
https://victor-more-recipes.herokuapp.com/

## Key Application features  
* Users can create account and log in
* Users can view recipes submitted by other users
* Authenticated uses can view details of a recipes in the catalog
* Authenticated user can edit and delete a recipe he submitted
* Authenticated user can add a recipe as his favourite
* Authenticated user can view a list of his favorite recipes
* Authenticated user can manage his profile
* Authenticated user can log out
* Authenticated user can upvote or downvote a recipe
* Authenticated user can review a recipe and see other users' reviews

## Technologies used
* <a href = "https://nodejs.org/">NodeJS</a> A Javascript runtime for serverside development
* <a href ="https://www.postgresql.org/">Postgres DBMS: </a> An open-source RDBMS for storing data
* <a href ="http://docs.sequelizejs.com/">Sequelize ORM: </a>A JavaScript-based ORM for mapping JS oject to DB tables.
* <a href ="https://getbootstrap.com/">Bootsrap: </a>A free and open-source front-end web framework for designing web applications templates.
* <a href = "https://expressjs.com/">Express web framework: </a> A NodeJS web application framework
* <a href ="https://jwt.io/">JSON Web Token: </a> A JSON-based standard for creating access tokens.
* <a href ="https://www.npmjs.com/package/bcrypt">Bcrypt: </a> A package for hashing password.
* <a href ="https://reactjs.org/">React: </a> A JavaScript library for building application user interfaces.
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
## Application API Documentation
* To view the API documentation for this application, check <a href="https://victor-more-recipes.herokuapp.com/docs">https://victor-more-recipes.herokuapp.com/docs</a>
## Testing
* Create a test database and name it `Testdb`
* Run Test `$ npm test`

## FAQ
__Can I have mulitiple user account?__
There is only one account per user email.
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


## How to Contribute

#### Please keep the following in mind while contributing:
* We use<a href = "https://github.com/airbnb/javascript"> Airbnb </a> for our style guide. Please adhere to it.
* Integrate `codeclimate` and `coveralls` during development.
* Test your code using `npm test` script.
* Keep pull requests concise, and document new functionality in PRs.
* Fork the repository
* Create a feature branch
* Open a pull request

## Bugs and Issues
If you notice a bug in this aplication, please report by creating an issue for feature. support requests with well-structured, detailed bug reports.


