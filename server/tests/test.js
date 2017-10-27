import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';

const expect = chai.expect;
const server = supertest.agent(app);
const recipes = [{
  recipeId: 1,
  recipeTitle: 'Jollof Rice and chicken',
  instructions: 'Per boil and cook for 30 minutes',
  ingredients: 'Rice, vegetable oil',
  upVote: 10,
  downVote: 3
}, {
  recipeId: 1,
  recipeTitle: 'Rice and plantain',
  instructions: 'Per boil and cook for 30 minutes',
  ingredients: 'Rice, vegetable oil',
  upVote: 7,
  downVote: 6
}, {
  recipeId: 1,
  recipeTitle: 'Jollof Rice and beans',
  instructions: 'Per boil and cook for 30 minutes',
  ingredients: 'Rice, vegetable oil',
  upVote: 2,
  downVote: 9
}];

describe('Recipe test', () => {
  const recipe = {
    recipeId: 5,
    recipeName: 'Jollof Rice',
    instructions: 'Per boil and cook for 30 minutes',
    ingredients: 'Rice, vegetable oil',
    upVote: 0,
  };
  it('should return json', (done) => {
    server
      .post('/api/recipes')
      .send(recipe)
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(201);
        return done();
      });
  });
  it('should get recipes as json', (done) => {
    server
      .get('/api/v1/recipes/')
      .send(recipe)
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(404);
        return done();
      });
  });

 it('should return recipe not found for invalid recipeId', (done) => {
    const update = {
      recipeId: 1,
      recipeTitle: 'Jollof rice and beans'
    };
    server
      .put('/api/v1/recipes/99')
      .send(update)
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(404);
        return done();
      });
  });
});

