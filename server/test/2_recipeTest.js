import 'chai';
import 'mocha';
import supertest from 'supertest';
import app from '../app';
import recipes from '../seeders/recipeSeeders';
import users from '../seeders/userSeeder';

const { expect } = require('chai');

const { createRecipe } = recipes;
const server = supertest.agent(app);
const { validUsersLogin } = users;
const userData = [];
let testRecipeId;
let testRecipeId1;
let testRecipeId2;

// Authenticating two users for testing recipes
describe('User Login', () => {
  it('create signed in user1 for recipe operations', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validUsersLogin[0])
      .end((err, res) => {
        userData[0] = res.body.token;
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully signed in.');
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
      .send(validUsersLogin[1])
      .end((err, res) => {
        userData[1] = res.body.token;
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully signed in.');
        if (err) return done(err);
        done();
      });
  });
});

describe('test recipe-creation route', () => {
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
    it('recipe creation should fail if recipeName is not supplied', (done) => {
      server
        .post('/api/v1/recipes')
        .set('x-access-token', userData[0])
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
    it('recipe creation should fail if ingredient is not supplied', (done) => {
      server
        .post('/api/v1/recipes')
        .set('x-access-token', userData[0])
        .send(createRecipe.nullIngredients)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Ingredients field ' +
          'cannot be empty');
          if (err) return done(err);
          done();
        });
    });
    it('recipe creation should fail if instruction is not supplied', (done) => {
      server
        .post('/api/v1/recipes')
        .set('x-access-token', userData[0])
        .send(createRecipe.nullInstructions)
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(406);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Instructions field cannot ' +
          'be empty');
          if (err) return done(err);
          done();
        });
    });
    it(
      'creates a recipe, given all required fields and authorisation',
      (done) => {
        server
          .post('/api/v1/recipes')
          .set('x-access-token', userData[0])
          .send(createRecipe.fullrecipeDetails)
          .end((err, res) => {
            testRecipeId = res.body.recipe.id;
            expect('Content-Type', /json/);
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Successfully created new ' +
            'recipe');
            if (err) return done(err);
            done();
          });
      }
    );
    it(
      'creates a recipe, given all required fields and authorisation',
      (done) => {
        server
          .post('/api/v1/recipes')
          .set('x-access-token', userData[1])
          .send(createRecipe.fullrecipeDetails1)
          .end((err, res) => {
            testRecipeId1 = res.body.recipe.id;
            expect('Content-Type', /json/);
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Successfully created ' +
            'new recipe');
            if (err) return done(err);
            done();
          });
      }
    );
  });
});

describe('test recipe edit route', () => {
  it('disallow recipe modification without ligin', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No Token provided');
        if (err) return done(err);
        done();
      });
  });
  it(
    'disallow recipe modification for a user who is not the recipe owner',
    (done) => {
      server
        .put(`/api/v1/recipes/${testRecipeId}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userData[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ instructions: 'mix, mash and boil for 30 minutes' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('You are not authorised to carry ' +
          'out this action');
          if (err) return done(err);
          done();
        });
    }
  );
  it('Returns negative if invalid recipe id is used', (done) => {
    server
      .put('/api/v1/recipes/testRecipe1d')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('You have entered an invalid ' +
        'parameter');
        if (err) return done(err);
        done();
      });
  });
  it('Returns negative for non existing recipe', (done) => {
    server
      .put('/api/v1/recipes/4')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });
  it('Allow a logged user to modify his own recipe', (done) => {
    server
      .put(`/api/v1/recipes/${testRecipeId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe successfully updated');
        if (err) return done(err);
        done();
      });
  });
});

describe('test recipe delete route', () => {
  it('disallow recipe delete without ligin', (done) => {
    server
      .delete(`/api/v1/recipes/${testRecipeId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No Token provided');
        if (err) return done(err);
        done();
      });
  });
  it(
    'disallow recipe modification for a user who is not the recipe owner',
    (done) => {
      server
        .delete(`/api/v1/recipes/${testRecipeId}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userData[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ instructions: 'mix, mash and boil for 30 minutes' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('You are not authorised to ' +
          'carry out this action');
          if (err) return done(err);
          done();
        });
    }
  );
  it('Returns negative if invalid recipe id is used', (done) => {
    server
      .delete('/api/v1/recipes/testRecipe1d')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('You have entered an invalid ' +
        'parameter');
        if (err) return done(err);
        done();
      });
  });
  it('Returns negative for non existing recipe', (done) => {
    server
      .delete('/api/v1/recipes/4')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Recipe not found');
        if (err) return done(err);
        done();
      });
  });
  it('Allow a logged user to modify his own recipe', (done) => {
    server
      .delete(`/api/v1/recipes/${testRecipeId}`)
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[0])
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ instructions: 'mix, mash and boil for 30 minutes' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Recipe has been deleted');
        if (err) return done(err);
        done();
      });
  });
});

describe('test recipe retrieval routes', () => {
  it(
    'creates a recipe, given all required fields and authorisation',
    (done) => {
      server
        .post('/api/v1/recipes')
        .set('x-access-token', userData[1])
        .send(createRecipe.fullrecipeDetails2)
        .end((err, res) => {
          testRecipeId2 = res.body.recipe.id;
          expect('Content-Type', /json/);
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Successfully created new recipe');
          if (err) return done(err);
          done();
        });
    }
  );

  it('retrieves recipes in descending order of upvotes', (done) => {
    server
      .get('/api/v1/recipes?sort=upvotes&order=des')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('recipes successfully retrieved');
        expect(res.body.recipes).to.be.an('array');
        expect(res.body.recipes.length).to.not.equal(0);
        if (err) return done(err);
        done();
      });
  });

  it('allows recipe retrieval without login', (done) => {
    server
      .get('/api/v1/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .type('form')
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('recipes successfully retrieved');
        expect(res.body.recipes).to.be.an('array');
        expect(res.body.recipes.length).to.not.equal(0);
        if (err) return done(err);
        done();
      });
  });
  it('allows logged in user to retrieve his recipes', (done) => {
    server
      .get('/api/v1/users/recipes')
      .set('Connection', 'keep alive')
      .set('Accept', 'application/json')
      .set('x-access-token', userData[1])
      .set('Content-Type', 'application/json')
      .type('form')
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('recipes successfully retrieved');
        expect(res.body.recipes).to.be.an('array');
        expect(res.body.recipes[1].id).to.equal(testRecipeId1);
        if (err) return done(err);
        done();
      });
  });
  it.skip(
    'allows logged in user to retrieve details of  a particular recipe',
    (done) => {
      server
        .get(`api/v1/recipes/${testRecipeId2}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userData[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('recipe successfully retrieved');
          expect(res.body.recipe.id).to.equal('testRecipeId1');
          if (err) return done(err);
          done();
        });
    }
  );

  it.skip(
    'increments the view count each time a recipe derails is viewed',
    (done) => {
      server
        .get(`api/v1/recipes/${testRecipeId2}`)
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('x-access-token', userData[1])
        .set('Content-Type', 'application/json')
        .type('form')
        .send()
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.recipe.views).to.equal(2);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('recipe successfully retrieved');
          expect(res.body.recipe.id).to.equal('testRecipeId1');
          if (err) return done(err);
          done();
        });
    }
  );
});

