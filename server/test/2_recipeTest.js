import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../../bin/www';
import recipes from '../seeders/recipeSeeders';
import users from '../seeders/userSeeder';

const createRecipe = recipes.createRecipe;

const expect = require('chai').expect,
  server = supertest(app),
  validUsersLogin = users.validUsersLogin;

var userData = [];

describe('test recipe routes', () => {
  // this user will be used to create the recipes
  before((done) => {
    server
      .post('/api/v1/users/signin')
      .type('form')
      .send(validUsersLogin[0])
      .end((err, res) => {
        userData.push(res.body.token);
      });

    // logged in user, other than test recioe owner
    server
      .post('/api/v1/users/signin')
      .type('form')
      .send(validUsersLogin[1])
      .end((err, res) => {
	      userData.userAuthToken2 = res.body.token;
      });
    done();
  });
  console.log('WWWWWWWWWWWWWWWW',userData);
  describe('POST/api/recipes', () => {
    it('disallows recipe creation without signin', (done) => {
      server
        .post('/api/v1/recipes')
        .send(createRecipe.fullRecipeDetails)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('No Token provided');
          if (err) return done(err);
          done();
        });
    });
    it.skip('recipe creation should fail if recipeName is not supplied', (done) => {
      server
        .post('/api/v1/recipes')
        .set('x-access-token', userData[0])
        // .set('authorization', `Bearer ${userData.userAuthToken}`)
        .send(createRecipe.nullrecipeName)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Please enter a recipe name');
          if (err) return done(err);
          done();
        });
    });
    it.skip('recipe creation should fail if ingredient is not supplied', (done) => {
      server
        .post('/api/v1/recipes')
        .set()
        // .set('authorization', `Bearer ${userData.userAuthToken}`)
        .send(createRecipe.nullIngredients)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Ingredients field cannot be empty');
          if (err) return done(err);
        });
    });
    it.skip('recipe creation should fail if instruction is not supplied', (done) => {
      server
        .post('/api/v1/recipes')
        .set('authorization', `Bearer ${userData.userAuthToken}`)
        .send(createRecipe.nullInstructions)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Instructions field cannot be empty');
          if (err) return done(err);
        });
    });
    it.skip('creates a recipe, given all required fields and authorisation', (done) => {
      server
        .post('/api/v1/recipes')
        .set('authorization', `Bearer ${userData.userAuthToken}`)
        .send(createRecipe.fullrecipeDetails)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('recipe successfully created');
          if (err) return done(err);
        });
    });
  });
});
