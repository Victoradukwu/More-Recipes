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

describe('Votes tests', () => {
  it('create signed in user1 for votes tests', (done) => {
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

  it('create signed in user2 for votes tests', (done) => {
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

describe('create recipe for votes tests', () => {
  it('creates a recipe when all conditions are met', (done) => {
    server
      .post('/api/v1/recipes')
      .set('x-access-token', userData[0])
      .send(createRecipe.fullrecipeDetails5)
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

  it('creates recipe fro votes tests', (done) => {
    server
      .post('/api/v1/recipes')
      .set('x-access-token', userData[1])
      .send(createRecipe.fullrecipeDetails4)
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

describe('test upvote actions', () => {
  it('disallows unauthenticated user from upvoting', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/upvote`)
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

  it('disallows a user from upvoting his own recipe', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/upvote`)
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('You can neither vote' +
        ' nor favorite your own recipe');
        if (err) return done(err);
        done();
      });
  });

  it('disallows a user from upvoting non-existing recipe', (done) => {
    server
      .put('/api/v1/recipes/32/upvote')
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

  it('Allows user to upvote a recipe when all conditions are met', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/upvote`)
      .set('x-access-token', userData[1])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to.equal('You hav successfully upvoted this recipe.');
        if (err) return done(err);
        done();
      });
  });

  it('Allows user to upvote a recipe when all conditions are met', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId1}/upvote`)
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to.equal('You hav successfully upvoted this recipe.');
        if (err) return done(err);
        done();
      });
  });

  it('disallows user from upvoting a recipe more than once', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/upvote`)
      .set('x-access-token', userData[1])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('vote has been removed on recipe');
        if (err) return done(err);
        done();
      });
  });
});

describe('test downvote actions', () => {
  it('disallows unauthenticated user from downvoting', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/downvote`)
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

  it('disallows a user from downvoting his own recipe', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/downvote`)
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message)
          .to.equal('You can neither vote nor favorite your own recipe');
        if (err) return done(err);
        done();
      });
  });

  it('disallows a user from downvoting non-existing recipe', (done) => {
    server
      .put('/api/v1/recipes/32/downvote')
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

  it('Allows user to downvote a recipe when all conditions are met', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/downvote`)
      .set('x-access-token', userData[1])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to.equal('You hav successfully downvoted this recipe.');
        if (err) return done(err);
        done();
      });
  });

  it('disallows user from downvoting a recipe more than once', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}/downvote`)
      .set('x-access-token', userData[1])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('vote has been removed on recipe');
        if (err) return done(err);
        done();
      });
  });
});
