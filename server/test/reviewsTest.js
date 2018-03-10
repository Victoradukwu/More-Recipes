import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../app';
import recipes from '../seeders/recipeSeeders';
import userSeeder from '../seeders/userSeeder';

const { expect } = require('chai');

const { createRecipe } = recipes;
const server = supertest.agent(app);
// const { validUsersLogin } = users;
const userData = [];
let testRecipeId;
let reviewId;

describe('User Login', () => {
  it('create signed in user1 for recipe review operations', (done) => {
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
  it('create signed in user2 for recipe operations', (done) => {
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


describe('create recipe for review tests', () => {
  it('creates a recipe for review testing', (done) => {
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
});

describe('test review-creation path', () => {
  it('disallows unauthenticated user from reviewing recipe', (done) => {
    server
      .post(`/api/v1/recipes/${testRecipeId}/review`)
      .send('Awesome recipe')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No Token provided');
        if (err) return done(err);
        done();
      });
  });
  it('disallows a user from reviewing non-existing recipe', (done) => {
    server
      .post('/api/v1/recipes/1000/review')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userData[0])
      .send({ comment: 'Awesome recipe' })

      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });
  it('Allows user to review a recipe when all conditions are met', (done) => {
    server
      .post(`/api/v1/recipes/${testRecipeId}/review`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userData[0])
      .send({ comment: 'Awesome recipe' })
      .end((err, res) => {
        reviewId = res.body.id;
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to.equal('successfully posted a review for this recipe.');
        expect(res.body.comment).to.equal('Awesome recipe');
        if (err) return done(err);
        done();
      });
  });
});

describe('test review-modify path', () => {
  it('disallows unauthenticated user from modifying a review', (done) => {
    server
      .put(`/api/v1/reviews/${reviewId}`)
      .send('Awesome recipe')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No Token provided');
        if (err) return done(err);
        done();
      });
  });
  it('disallows a user from modifying a non-existing review', (done) => {
    server
      .put('/api/v1/reviews/1000')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userData[0])
      .send({ comment: 'Awesome recipe' })

      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('this review cannot be found');
        if (err) return done(err);
        done();
      });
  });
  it('disallows a user from modifying another user\'s review', (done) => {
    server
      .put(`/api/v1/reviews/${reviewId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userData[1])
      .send({ comment: 'Awesome recipe reloaded' })
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message)
          .to.equal('You are not authorised to carry out this action');
        if (err) return done(err);
        done();
      });
  });
  it('Allows user to modify a review when all conditions are met', (done) => {
    server
      .put(`/api/v1/reviews/${reviewId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userData[0])
      .send({ comment: 'Awesome recipe reloaded' })
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Successfully edited review');
        expect(res.body.comment).to.equal('Awesome recipe reloaded');
        if (err) return done(err);
        done();
      });
  });
});

describe('test review-delete path', () => {
  it('disallows unauthenticated user from deleting a review', (done) => {
    server
      .delete(`/api/v1/reviews/${reviewId}`)
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
  it('disallows a user from deleting a non-existing review', (done) => {
    server
      .delete('/api/v1/reviews/1000')
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('this review cannot be found');
        if (err) return done(err);
        done();
      });
  });
  it('prevent a user from deleting another user\'s review', (done) => {
    server
      .delete(`/api/v1/reviews/${reviewId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userData[1])
      .send({ comment: 'Awesome recipe reloaded' })
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message)
          .to.equal('You are not authorised to carry out this action');
        if (err) return done(err);
        done();
      });
  });
  it('Allows user to delete a review when all conditions are met', (done) => {
    server
      .delete(`/api/v1/reviews/${reviewId}`)
      .set('x-access-token', userData[0])
      .send()
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message)
          .to.equal('review has been deleted successfully');
        if (err) return done(err);
        done();
      });
  });
});
