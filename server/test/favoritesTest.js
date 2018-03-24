import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../app';
import recipes from '../seeders/recipeSeeders';
import userSeeder from '../seeders/userSeeder';

const { expect } = require('chai');

const { createRecipe } = recipes;
const server = supertest.agent(app);
const userData = [];
let testRecipeId;
let testRecipeId1;
describe('Favorites Tests', () => {
  it('create signed in user1 for Fevorites tests', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.validLogin1)
      .end((err, res) => {
        userData[0] = res.body.token;
        if (err) return done(err);
        done();
      });
  });
  it('create signed in user2 for favorites tests', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(userSeeder.validLogin2)
      .end((err, res) => {
        userData[1] = res.body.token;
        if (err) return done(err);
        done();
      });
  });
});

describe('create recipe for favorites tests', () => {
  it('creates a recipe when all conditions are met', (done) => {
    server
      .post('/api/v1/recipes')
      .set('x-access-token', userData[0])
      .send(createRecipe.fullrecipeDetails)
      .end((err, res) => {
        testRecipeId = res.body.recipe.id;
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Successfully created new recipe');
        if (err) return done(err);
        done();
      });
  });
  it('create recipe for favorites tests', (done) => {
    server
      .post('/api/v1/recipes')
      .set('x-access-token', userData[1])
      .send(createRecipe.fullrecipeDetails5)
      .end((err, res) => {
        testRecipeId1 = res.body.recipe.id;
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Successfully created new recipe');
        if (err) return done(err);
        done();
      });
  });
});

describe('test favorites actions', () => {
  it('disallows unauthenticated user from favoriting', (done) => {
    server
      .post(`/api/v1/users/${testRecipeId}/favorites`)
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No Token provided');
        if (err) return done(err);
        done();
      });
  });
  it('disallows a user from favoriting his own recipe', (done) => {
    server
      .post(`/api/v1/users/${testRecipeId}/favorites`)
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('You can neither vote nor ' +
        'favorite your own recipe');
        if (err) return done(err);
        done();
      });
  });
  it('disallows a user from favoriting non-existing recipe', (done) => {
    server
      .post('/api/v1/users/32/favorites')
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });
  it('Allows user to favorite a recipe when all conditions are met', (done) => {
    server
      .post(`/api/v1/users/${testRecipeId}/favorites`)
      .set('x-access-token', userData[1])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully added this ' +
        'recipe to favorites.');
        if (err) return done(err);
        done();
      });
  });
  it('Allows user to favorite a recipe when all conditions are met', (done) => {
    server
      .post(`/api/v1/users/${testRecipeId1}/favorites`)
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully added this ' +
        'recipe to favorites.');
        if (err) return done(err);
        done();
      });
  });
  it('disallows user from favoriting a recipe more than once', (done) => {
    server
      .post(`/api/v1/users/${testRecipeId}/favorites`)
      .set('x-access-token', userData[1])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to.equal('recipe has been removed from favorites');
        if (err) return done(err);
        done();
      });
  });
});
